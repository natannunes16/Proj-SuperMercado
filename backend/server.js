const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const clientRoutes = require('./routes/clientRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const productRoutes = require('./routes/productRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config(); 

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.use('/api/clients', clientRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/promotions', promotionRoutes);

mongoose.connect('mongodb+srv://izuku1208:iEE2tzoC9uRRlv6p@clientes.weuoj.mongodb.net/Supermarket', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
