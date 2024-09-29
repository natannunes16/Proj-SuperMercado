require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoutes = require('./src/routes/userRoutes');
const app = express();

// Importar rotas
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const promotionRoutes = require('./src/routes/promotionRoutes');

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.log('Erro ao conectar ao MongoDB:', error));

// Rotas
app.use('/api/usuarios', userRoutes);
app.use('/api/produtos', productRoutes);
app.use('/api/promocoes', promotionRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
