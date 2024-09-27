const express = require('express');
const { createPromotion, getPromotion, updatePromotion, deletePromotion } = require('../controllers/promotionController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, createPromotion);
router.get('/:id', verifyToken, getPromotion);
router.put('/:id', verifyToken, updatePromotion);
router.delete('/:id', verifyToken, deletePromotion);

module.exports = router;
