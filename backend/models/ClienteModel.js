const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  cpf: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  idade: {
    type: Date,
    default: true,
  },
  tempo: {
    type: Date,
    default: true,
  }
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;