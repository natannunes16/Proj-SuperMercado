const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const produtoRoutes = require('./routes/ProdutoRoute.js');
const clienteRoutes = require('./routes/ClienteRoute.js');
const funcionarioRoutes = require('./routes/FuncionarioRoute.js');
const promocaoRoutes = require('./routes/PromocaotRoute.js');
// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conectar ao MongoDB usando Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

// Usar as rotas
app.use('/produto', produtoRoutes);
app.use('/cliente', clienteRoutes);
app.use('/funcionario', funcionarioRoutes);
app.use('/promocao', promocaoRoutes);

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});