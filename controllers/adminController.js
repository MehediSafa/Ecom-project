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


//delte user

//check individual user 

let singleUser = async (req,res) => {
    let {id} = req.params 
    let data = await User.findById({_id:id})

    res.status(200).json({
        success:true,
        message:`User information `,
        data:data,
    })
}

module.exports = {allUserController,singleUser}