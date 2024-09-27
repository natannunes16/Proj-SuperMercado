const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cargo: { type: String, required: true },
    dataContratacao: { type: Date, required: true },
    turno: { type: String, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
