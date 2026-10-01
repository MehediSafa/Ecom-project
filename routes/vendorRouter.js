const express = require('express');

const {createCategory,getAllCategory} = require('../controllers/vendorController');
const _ = express.Router()



_.post('/create/category',createCategory)
_.get('/all/category',getAllCategory)

module.exports = _