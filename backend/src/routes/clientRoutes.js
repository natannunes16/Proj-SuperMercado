const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clienteController');


router.get('/:clienteId/desconto', clientController.applyDiscountToClient);

module.exports = router;
