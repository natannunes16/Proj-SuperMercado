const express = require('express');
const { createEmployee, getEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController.js');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/:id', verifyToken, getEmployee);
router.post('/', verifyToken, createEmployee);
router.put('/:id', verifyToken, updateEmployee);
router.delete('/:id', verifyToken, deleteEmployee);

module.exports = router;
