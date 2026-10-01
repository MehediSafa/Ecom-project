const express = require('express');
const {userController,updateUserProfile} = require('../controllers/userController');
const _ = express.Router()


_.get('/product',userController)

_.post('/updateprofile/:id',updateUserProfile)


module.exports = _ 