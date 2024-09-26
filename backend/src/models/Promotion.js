const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
  produto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  descricao: { type: String, required: true },
  desconto_percentual: { type: Number, required: true },
  data_inicio: { type: Date, required: true },
  data_fim: { type: Date, required: true }
});

module.exports = mongoose.model('Promotion', PromotionSchema);
