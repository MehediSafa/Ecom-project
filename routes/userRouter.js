const express = require('express');
const {userController,updateUserProfile,createCategory,getAllCategory} = require('../controllers/userController');
const _ = express.Router()


_.get('/product',userController)
_.post('/create/category',createCategory)

_.get('/all/vategory',getAllCategory)
_.post('/updateprofile/:id',updateUserProfile)


module.exports = _