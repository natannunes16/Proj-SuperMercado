const express = require('express');
const userController = require('../controllers/userController.js');
const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser); // Adicione esta linha
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
