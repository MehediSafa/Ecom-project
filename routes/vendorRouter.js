const express = require('express');
const vendorController = require('../controllers/userController');
const _ = express.Router()


_.post('/create/product',vendorController)


module.exports = _