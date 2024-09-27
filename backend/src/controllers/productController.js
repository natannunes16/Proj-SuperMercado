const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    const { nome, categoria, preco, descricao, dataValidade } = req.body;
    try {
        const product = new Product({ nome, categoria, preco, descricao, dataValidade });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar produto.' });
    }
};
