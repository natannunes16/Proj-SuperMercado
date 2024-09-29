const express = require('express');
const router = express.Router();
const Produto = require('../models/Product');

// Rota para adicionar um produto
router.post('/', async (req, res) => {
  try {
    const produto = new Produto(req.body);
    await produto.save();
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao adicionar produto', error });
  }
});

// Rota para listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos', error });
  }
});

module.exports = router;
