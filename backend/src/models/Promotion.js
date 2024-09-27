const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    produtoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    descontoPercentual: { type: Number, required: true },
    dataInicio: { type: Date, required: true },
    dataFim: { type: Date, required: true }
});

const Promotion = mongoose.model('Promotion', promotionSchema);
module.exports = Promotion;
