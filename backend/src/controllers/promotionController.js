const Promocao = require('../models/Promotion');
const Produto = require('../models/Product');

// Criar nova promoção
exports.createPromotion = async (req, res) => {
  const { produtoId, descricao, descontoPercentual, dataInicio, dataFim } = req.body;

  try {
      const produto = await Produto.findById(produtoId);
      if (!produto) {
          return res.status(404).json({ message: 'Produto não encontrado.' });
      }

      const newPromotion = new Promocao({
          produtoId, // Correto
          descontoPercentual, // Correto
          descricao,
          dataInicio,
          dataFim
      });

      await newPromotion.save();

      // Atualiza o preço promocional do produto
      produto.precoPromocional = produto.precoAtual - (produto.precoAtual * descontoPercentual / 100);
      await produto.save();

      return res.status(201).json({ message: 'Promoção criada com sucesso.', promotion: newPromotion });
  } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar promoção.', error: error.message });
  }
};

exports.updatePromotion = async (req, res) => {
  const { id } = req.params;
  const { descricao, descontoPercentual, dataInicio, dataFim } = req.body;

  try {
      const promotion = await Promocao.findByIdAndUpdate(
          id,
          { descricao, descontoPercentual, dataInicio, dataFim },
          { new: true, runValidators: true }
      );

      if (!promotion) {
          return res.status(404).json({ message: 'Promoção não encontrada.' });
      }

      // Atualizar o preço promocional no produto relacionado
      const produto = await Produto.findById(promotion.produtoId);
      produto.precoPromocional = produto.precoAtual - (produto.precoAtual * promotion.descontoPercentual / 100);
      await produto.save();

      return res.status(200).json({ message: 'Promoção atualizada com sucesso.', promotion });
  } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar promoção.', error: error.message });
  }
};

exports.getAllPromotions = async (req, res) => {
  try {
      const promotions = await Promocao.find().populate('produtoId');
      if (promotions.length === 0) {
          return res.status(404).json({ message: 'Nenhuma promoção encontrada.' });
      }
      return res.status(200).json(promotions);
  } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar promoções.', error: error.message });
  }
};


exports.getPromotionById = async (req, res) => {
  const { id } = req.params;

  try {
      const promotion = await Promocao.findById(id).populate('produtoId');
      if (!promotion) {
          return res.status(404).json({ message: 'Promoção não encontrada.' });
      }

      return res.status(200).json(promotion);
  } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar promoção.', error: error.message });
  }
};


exports.deletePromotion = async (req, res) => {
  const { id } = req.params;

  try {
      const promotion = await Promocao.findByIdAndDelete(id);

      if (!promotion) {
          return res.status(404).json({ message: 'Promoção não encontrada.' });
      }

      // Atualiza o preço do produto relacionado para remover o desconto
      const produto = await Produto.findById(promotion.produtoId);
      if (produto) {
          produto.precoPromocional = null;
          await produto.save();
      }

      return res.status(200).json({ message: 'Promoção removida com sucesso.' });
  } catch (error) {
      return res.status(500).json({ message: 'Erro ao remover promoção.', error: error.message });
  }
};

