const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    senha: { type: String, required: true }
});

// Middleware para hash da senha antes de salvar
userSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
