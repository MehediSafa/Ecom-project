const express = require('express');
const {allUserController,singleUser,activeUser,deActiveUser,deleteUser,updateUser} = require('../controllers/adminController');
const _ = express.Router()

_.get('/all-user',allUserController)
_.get('/user/:id',singleUser)
_.get('/active/user',activeUser)
_.get('/deactive/user',deActiveUser)
_.post('/update/user/:id',updateUser)
_.delete('/delete/user/:id',deleteUser)

module.exports = _