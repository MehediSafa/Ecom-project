let User = require('../models/userSchema.js')

let allUserController = async (req,res)=>{
    let user = await User.find({}) 

    res.status(200).json(
        {
            success:true,
            message:`${user.length} users found`,
            data:user
        }
    )
    
}

module.exports = allUserController