const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    const { nome, email, senha, cpf } = req.body;

    try {
        // Verifica se o usuário já está registrado pelo e-mail ou CPF
        const userExists = await User.findOne({ $or: [{ email }, { cpf }] });
        if (userExists) {
            return res.status(400).json({ message: 'E-mail ou CPF já cadastrado.' });
        }

        // Criptografa a senha antes de salvar o usuário
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);

        // Cria um novo usuário com a senha criptografada e o CPF
        const newUser = new User({ nome, email, senha: hashedPassword, cpf });
        await newUser.save();

        // Mensagem de sucesso após o registro
        return res.status(201).json({ message: 'Usuário registrado com sucesso.', user: newUser });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'Erro ao cadastrar usuário',
                error: {
                    errorResponse: error,
                },
            });
        }
        return res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter usuários.' });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter usuário.' });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, cpf } = req.body;

    try {
        const userExists = await User.findOne({ _id: { $ne: id }, $or: [{ email }, { cpf }] });
        if (userExists) {
            return res.status(400).json({ message: 'E-mail ou CPF já cadastrado.' });
        }

        const updateData = { nome, email, cpf };

        if (senha) {
            const salt = await bcrypt.genSalt(10);
            updateData.senha = await bcrypt.hash(senha, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        return res.status(200).json({ message: 'Usuário atualizado com sucesso.', updatedUser });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar usuário.' });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        return res.status(200).json({ message: 'Usuário removido com sucesso.' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao remover usuário.' });
    }
};

// Função para login de usuário
exports.loginUser = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Procura o usuário pelo e-mail
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos' });
        }

        // Compara a senha fornecida com a senha armazenada
        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos' });
        }

        // Gera um token JWT
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Token válido por 1 hora
        });

        // Envia o token no cookie da resposta
        res.cookie('token', token, { httpOnly: true });
        return res.status(200).json({ message: 'Login bem-sucedido', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};
