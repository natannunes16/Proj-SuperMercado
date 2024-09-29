const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt'); 

const login = async (req, res) => {
  const { email, senha } = req.body; 

  try {
    // Procura o usuário pelo e-mail
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'E-mail ou senha incorretos' });
    }

    // Compara a senha fornecida com a senha armazenada
    const isMatch = await bcrypt.compare(senha, user.senha); // Supondo que a senha está criptografada
    if (!isMatch) {
      return res.status(401).json({ message: 'E-mail ou senha incorretos' });
    }

    // Gera um token JWT
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h' // Token válido por 1 hora
    });

    // Envia o token no cookie da resposta
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' }); // Ajuste conforme necessário
    res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    console.error(error); // Para fins de depuração
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login };
