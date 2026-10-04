let User = require('../models/userSchema.js')
let Cat = require('../models/categorySchema.js')

let userController = async (req,res)=>{
    res.send("hello user")
}




//send email after categor has been created

//update user 

let updateUserProfile = async (req,res) => {
    let {id} = req.params
    let {fullName, email} = req.body
    
    let data = await User.findByIdAndUpdate({id},{
        fullName:fullName,
        email:email
    },{new:true,runValidators:true})

    res.status(200).json({
        success:true,
        message:`User info updated`,
        data:data
    })

}



module.exports = {userController,updateUserProfile}