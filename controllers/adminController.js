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
    let data = await User.findById({_id:id}).select('-password')

    res.status(200).json({
        success:true,
        message:`User information `,
        data:data,
    })
}



//update user 

let activeUser = async (req,res) => {
    let data = await User.find({status:'active'})

    res.status(200).json({
        success:true,
        message:   `Active User Info`,
        data:data
    })
}


module.exports = {allUserController,singleUser,activeUser }