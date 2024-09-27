// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota POST para registrar um novo usuário
router.post('/register', userController.registerUser);

// Rota POST para login de usuário
router.post('/login', userController.loginUser);

module.exports = router;
