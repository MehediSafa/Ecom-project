const express = require('express');
const {allUserController,singleUser,activeUser} = require('../controllers/adminController');
const _ = express.Router()


_.get('/all-user',allUserController)
_.get('/user/:id',singleUser)
_.get('/active/user',activeUser)

module.exports = _