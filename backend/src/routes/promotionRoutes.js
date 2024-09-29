const express = require('express');
const { createPromotion, getPromotion, updatePromotion, deletePromotion } = require('../controllers/promotionController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, createPromotion);
router.get('/:id', verifyToken, getPromotion);
router.put('/:id', verifyToken, updatePromotion);
router.delete('/:id', verifyToken, deletePromotion);

module.exports = router;
const express = require('express');
const Promocao = require('../models/Promotion');
const Produto = require('../models/Product');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.post('/promocoes', authMiddleware, async (req, res) => {
  try {
    const { produtoId, desconto, dataInicio, dataFim } = req.body;
    const produto = await Produto.findById(produtoId);
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });

    const promocao = new Promocao({ produto: produtoId, desconto, dataInicio, dataFim });
    await promocao.save();

    // Atualizar preço promocional do produto
    produto.precoPromocional = produto.precoAtual * (1 - desconto / 100);
    await produto.save();

    res.status(201).json(promocao);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao cadastrar promoção' });
  }
});

module.exports = router;
