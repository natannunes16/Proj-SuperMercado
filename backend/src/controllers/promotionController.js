const Promotion = require('../models/Promotion');

const createPromotion = async (req, res) => {
  try {
    const promotion = new Promotion(req.body);
    await promotion.save();
    res.status(201).json(promotion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id).populate('produto_id');
    if (!promotion) return res.status(404).json({ message: 'Promoção não encontrada' });
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!promotion) return res.status(404).json({ message: 'Promoção não encontrada' });
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!promotion) return res.status(404).json({ message: 'Promoção não encontrada' });
    res.json({ message: 'Promoção removida' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPromotion, getPromotion, updatePromotion, deletePromotion };
