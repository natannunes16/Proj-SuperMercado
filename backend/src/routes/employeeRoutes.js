const express = require('express');
const { createEmployee, getEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/', verifyToken, createEmployee);
router.get('/:id', verifyToken, getEmployee);
router.put('/:id', verifyToken, updateEmployee);
router.delete('/:id', verifyToken, deleteEmployee);

module.exports = router;
