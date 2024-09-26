const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  categoria: { type: String, required: true },
  preco: { type: Number, required: true },
  unidade: { type: String, required: true },
  descricao: { type: String, required: true },
  data_validade: { type: Date, required: true },
  preco_promocao: { type: Number, default: 0 }
});

module.exports = mongoose.model('Product', ProductSchema);
