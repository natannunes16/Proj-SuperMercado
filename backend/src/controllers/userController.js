const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Registro de usuário
exports.registerUser = async (req, res) => {
    const { nome, email, senha } = req.body;  // Atualizado para 'email' em vez de 'cpf'

    try {
        // Verifica se o usuário já está registrado pelo e-mail
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'E-mail já cadastrado.' });
        }

        // Criptografa a senha antes de salvar o usuário
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);

        // Cria um novo usuário com a senha criptografada
        const newUser = new User({ nome, email, senha: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
};

// Login de usuário
exports.loginUser = async (req, res) => {
    const { email, senha } = req.body;  // Atualizado para 'email'

    try {
        // Verifica se o usuário existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'E-mail ou senha incorretos' });
        }

        // Compara a senha informada com a senha armazenada no banco de dados
        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(400).json({ message: 'E-mail ou senha incorretos' });
        }

        // Gera um token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Envia o token no cookie da resposta
        res.cookie('token', token, { httpOnly: true }).status(200).json({ message: 'Login realizado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao realizar login.' });
    }
};
