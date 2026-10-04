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

//active user

let activeUser = async (req,res) => {
    let data = await User.find({status:'active'})

    res.status(200).json({
        success:true,
        message:`Active User Info`,
        data:data
    })
}

//active user

let deActiveUser = async (req,res) => {
    let data = await User.find({status:'deactive'})

    res.status(200).json({
        success:true,
        message:`Deactive User Info`,
        data:data
    })
}


//delte user

let deleteUser = async (req,res) => {
    let {id} = req.params 
let user = await User.findByIdAndDelete(id)

if(!user){
    return res.status(400).json({
        success:false,
        message:'User not found'
    })

    
}
   return res.status(200).json({
        success:true,
        message:'User Deleted'
    })
}

//update user

let updateUser = async (req,res) => {
    let {id} = req.params

    await User.findByIdAndUpdate({_id:id},req.body,{new:true})

    res.status(200).json({
        success:true,
        message:`User Updated`
    })

}




module.exports = {allUserController,singleUser,activeUser,deActiveUser,updateUser,deleteUser}