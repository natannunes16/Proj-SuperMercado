const express = require('express');
const { createClient, getClient, updateClient, deleteClient } = require('../controllers/clientController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/', verifyToken, createClient);
router.get('/:id', verifyToken, getClient);
router.put('/:id', verifyToken, updateClient);
router.delete('/:id', verifyToken, deleteClient);

module.exports = router;
