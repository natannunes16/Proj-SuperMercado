const express = require('express');
const router = express.Router();
const Promocoes = require('../models/PromocaoModel.js');

router.post('/promocoes', async (req, res) => {
  try {
    const newPromocoes = new Promocoes(req.body);
    await newPromocoes.save();
    res.status(201).json(newPromocoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/promocoes', async (req, res) => {
  try {
    const promocoes = await Promocoes.find();
    res.status(200).json(promocoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/promocoes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPromocoes = await Promocoes.findByIdAndUpdate(
      id,
      req.body, 
      { new: true, runValidators: true } 
    );

    if (!updatedPromocoes) {
      return res.status(404).json({ error: 'Promoção não encontrado' });
    }

    res.status(200).json(updatedPromocoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/promocoes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPromocoes = await Promocoes.findByIdAndDelete(id);

    if (!deletedPromocoes) {
      return res.status(404).json({ error: 'Promoção não encontrado' });
    }

    res.status(200).json({ message: 'Promoção removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
