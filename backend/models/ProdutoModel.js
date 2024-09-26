const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  unidade: {
    type: String,
    default: true,
  },
  descricao: {
    type: String,
    default: true,
  },
  validade: {
    type: Date,
    default: true,
  },
  imgSrc: {
    type: String,
    default: true,
  },
});

const Produto = mongoose.model('Product', produtoSchema);

module.exports = Produto;
