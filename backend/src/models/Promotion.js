const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
  desconto: { type: Number, required: true },
  dataInicio: { type: Date, required: true },
  dataFim: { type: Date, required: true }
});

module.exports = mongoose.model('Promocao', promotionSchema);
