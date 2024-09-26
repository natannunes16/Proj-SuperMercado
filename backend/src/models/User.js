const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  cargo: { type: String, required: true }
});


UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('senha')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.senha = await bcrypt.hash(user.senha, salt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = function (senha) {
  return bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model('User', UserSchema);
