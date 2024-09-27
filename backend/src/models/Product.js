const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    categoria: { type: String, required: true },
    preco: { type: Number, required: true },
    precoPromocional: { type: Number, default: null },
    descricao: { type: String },
    dataValidade: { type: Date, required: true }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
