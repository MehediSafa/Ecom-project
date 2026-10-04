const express = require('express');

const {createCategory,getAllCategory,createSubCategory,getAllSubCategory,getAllCategoryWiseSubCategory,getAllOwnerWiseCategory,updateCategory} = require('../controllers/vendorController');
const _ = express.Router()



_.post('/create/category',createCategory)
_.post('/create/subcategory',createSubCategory)
_.get('/all/category',getAllCategory)
_.patch('/update/category/:id',updateCategory)
_.get('/subcategory',getAllSubCategory)
_.get('/category/:id/subcategory',getAllCategoryWiseSubCategory)
_.get('/all/user/:id/category',getAllOwnerWiseCategory)

module.exports = _