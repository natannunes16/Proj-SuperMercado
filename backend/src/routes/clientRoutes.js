const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientControllers');


router.get('/:clienteId/desconto', clientController.applyDiscountToClient);
router.get('/', clientController.getAllClients);
module.exports = router;
