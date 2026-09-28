const express = require('express');
const {allUserController,singleUser} = require('../controllers/adminController');
const _ = express.Router()


_.get('/all-user',allUserController)
_.get('/user/:id',singleUser)

module.exports = _