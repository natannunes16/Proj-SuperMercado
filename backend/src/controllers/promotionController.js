router.get('/promocoes-personalizadas', authMiddleware, async (req, res) => {
  const clienteId = req.user.id;

  // Buscar histórico de compras
  const compras = await Compra.find({ cliente: clienteId }).populate('produto');

  // Lógica para recomendar promoções com base nas compras anteriores
  const categoriasFrequentes = compras.reduce((acc, compra) => {
    const categoria = compra.produto.tipo;
    acc[categoria] = (acc[categoria] || 0) + 1;
    return acc;
  }, {});

  const categoriaPreferida = Object.keys(categoriasFrequentes).reduce((a, b) => categoriasFrequentes[a] > categoriasFrequentes[b] ? a : b);

  const promocoes = await Promocao.find().populate('produto');
  const promocoesRelevantes = promocoes.filter(promocao => promocao.produto.tipo === categoriaPreferida);

  res.json(promocoesRelevantes);
});
