const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  idade: { type: Number, required: true },
  tempo_cliente: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Client', ClientSchema);
