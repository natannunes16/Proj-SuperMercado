const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const clientRoutes = require('./routes/clientRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const productRoutes = require('./routes/productRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config(); // Para usar variáveis de ambiente

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Rotas de Autenticação
app.use('/api/auth', authRoutes);

// Rotas Protegidas
app.use('/api/clients', clientRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/promotions', promotionRoutes);

// Conectar ao MongoDB
mongoose.connect('mongodb+srv://izuku1208:iEE2tzoC9uRRlv6p@clientes.weuoj.mongodb.net/Supermarket', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
