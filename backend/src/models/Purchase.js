const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
  preco: { type: Number, required: true },
  dataCompra: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Compra', purchaseSchema);
