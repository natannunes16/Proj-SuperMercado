const express = require('express');
const Produto = require('../models/Product');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.post('/produtos', authMiddleware, async (req, res) => {
  try {
    const produto = new Produto(req.body);
    await produto.save();
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao cadastrar produto' });
  }
});

router.get('/produtos', authMiddleware, async (req, res) => {
  const produtos = await Produto.find();
  res.json(produtos);
});

module.exports = router;
