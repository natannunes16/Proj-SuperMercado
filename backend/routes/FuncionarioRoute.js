const express = require('express');
const router = express.Router();
const Funcionarios = require('../models/FuncionarioModel.js');

router.post('/funcionarios', async (req, res) => {
  try {
    const newFuncionarios = new Funcionarios(req.body);
    await newFuncionarios.save();
    res.status(201).json(newFuncionarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/funcionarios', async (req, res) => {
  try {
    const funcionarios = await Funcionarios.find();
    res.status(200).json(funcionarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/funcionarios/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedFuncionarios = await Funcionarios.findByIdAndUpdate(
      id,
      req.body, 
      { new: true, runValidators: true } 
    );

    if (!updatedFuncionarios) {
      return res.status(404).json({ error: 'Funcionario não encontrado' });
    }

    res.status(200).json(updatedFuncionarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remover um produto
router.delete('/funcionarios/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFuncionarios = await Funcionarios.findByIdAndDelete(id);

    if (!deletedFuncionarios) {
      return res.status(404).json({ error: 'Funcionario não encontrado' });
    }

    res.status(200).json({ message: 'Funcionario removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
