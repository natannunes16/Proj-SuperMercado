const express = require('express');
const userController = require('../controllers/userController'); // Importa o controller
const router = express.Router();

// Rotas públicas
router.post('/register', userController.registerUser);  // Rota de registro de usuário
router.post('/login', userController.loginUser);        // Rota de login de usuário
router.post('/logout', userController.logoutUser);      // Rota de logout de usuário

// Rotas protegidas (exemplo de rota que requer autenticação)
router.get('/perfil', userController.authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-senha'); // Retorna os dados do usuário exceto a senha
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao carregar perfil.' });
    }
});

module.exports = router;
