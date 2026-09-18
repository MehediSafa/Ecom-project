let User = require('../models/userSchema.js')

let userController = async (req,res)=>{
    res.send("hello user")
}

module.exports = userController