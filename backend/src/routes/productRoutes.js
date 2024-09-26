const express = require('express');
const { createProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/', verifyToken, createProduct);
router.get('/:id', verifyToken, getProduct);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;
