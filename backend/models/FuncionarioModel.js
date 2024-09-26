const mongoose = require('mongoose');

const funcionarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  cargo: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  turno: {
    type: String,
    default: true,
  },
});

const Funcionario = mongoose.model('Funcionario', funcionarioSchema);

module.exports = Funcionario;