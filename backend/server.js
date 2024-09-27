const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const employeeRoutes = require('./src/routes/employeeRoutes');
const productRoutes = require('./src/routes/productRoutes');
const promotionRoutes = require('./src/routes/promotionRoutes');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes')
require('dotenv').config(); 

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Conectar ao MongoDB


// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/promotions', promotionRoutes);
app.get('/api/protected', authMiddleware, (req, res) => {
  res.send('Esta é uma rota protegida');
});
mongoose.connect('mongodb://localhost:27017/Supermarket', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
