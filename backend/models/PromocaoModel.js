const mongoose = require('mongoose');

const promocaoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  produto_Id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "produto"
  },
  descricao: {
    type: String,
    required: true,
  },
  desconto: {
    type: Number,
    default: true,
  },
  dataInicio: {
    type: Date,
    default: true,
  },
  dataFim: {
    type: Date,
    default: true,
  },
});

const promocao = mongoose.model('promocao', promocaoSchema);

module.exports = promocao;