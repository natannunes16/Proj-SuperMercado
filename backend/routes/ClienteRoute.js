const express = require('express');
const router = express.Router();
const Clientes = require('../models/ClienteModel.js');

router.post('/clientes', async (req, res) => {
  try {
    const newClientes = new Clientes(req.body);
    await newClientes.save();
    res.status(201).json(newClientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/clientes', async (req, res) => {
  try {
    const clientes = await Clientes.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedClientes = await Clientes.findByIdAndUpdate(
      id,
      req.body, 
      { new: true, runValidators: true } 
    );

    if (!updatedClientes) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    res.status(200).json(updatedClientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedClientes = await Clientes.findByIdAndDelete(id);

    if (!deletedClientes) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    res.status(200).json({ message: 'Cliente removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
