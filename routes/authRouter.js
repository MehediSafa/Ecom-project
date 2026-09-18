const express = require('express');
const {registrationController,loginController,verifyEmailController,forgotPasswordController,resetPassword} = require('../controllers/authController');
const _ = express.Router()




_.post('/registration',registrationController )
_.post('/login',loginController)
_.post('/verify/:token',verifyEmailController)
_.post('/forgot-password',forgotPasswordController)
_.post('/reset-password/:token',resetPassword)

module.exports = _