const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cargo: { type: String, required: true },
  data_contratacao: { type: Date, required: true },
  turno: { type: String, required: true }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
