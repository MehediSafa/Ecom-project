const express = require('express');

const {createCategory,getAllCategory,createSubCategory,getAllSubCategory,getAllCategoryWiseSubCategory,getAllOwnerWiseCategory} = require('../controllers/vendorController');
const _ = express.Router()



_.post('/create/category',createCategory)
_.post('/create/subcategory',createSubCategory)
_.get('/all/category',getAllCategory)
_.get('/all/subcategory',getAllSubCategory)
_.get('/all/category/:id/subcategory',getAllCategoryWiseSubCategory)
_.get('/all/user/:id/category',getAllOwnerWiseCategory)

module.exports = _