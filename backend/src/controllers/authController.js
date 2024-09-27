const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    
    const user = await User.findOne({ cpf });
    if (!user) {
      return res.status(401).json({ message: 'CPF ou senha incorretos' });
    }

    const isMatch = await user.comparePassword(senha);
    if (!isMatch) {
      return res.status(401).json({ message: 'CPF ou senha incorretos' });
    }

    const token = jwt.sign({ id: user._id, cpf: user.cpf }, process.env.JWT_SECRET, {
      expiresIn: '1h' // Token válido por 1 hora
    });

    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login };
