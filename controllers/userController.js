let User = require('../models/userSchema.js')
let Cat = require('../models/categorySchema.js')

let userController = async (req,res)=>{
    res.send("hello user")
}

//create category

let createCategory =  async (req,res) => {
    let {name} = req.body

    if(!name){
        return res.status(201).json({
            success:false,
            message:'Please enter a category'
        })
    }

    let existingName = await Cat.findOne({name:name.toLowerCase() })

    if(existingName){
        return res.status(201).json({
            success:false,
            message:'Category already exists'
        })
    }

    let cat = new Cat({
        name:name.toLowerCase()
    })

    await cat.save()

    res.status(201).json({
            success:true,
            message:'Category created'
        })
}


//find all category

let getAllCategory = async (req,res)=>{

    let category = await Cat.find({})
    res.status(200).json({
        success:true,
        message:"All category",
        data:category
    })
}

//send email after categor has been created

//update user 

let updateUserProfile = async (req,res) => {
    let {id} = req.params
    let data = await User.findByIdAndUpdate({id},req.body,{new:true})

    res.status(200).json({
        success:true,
        message:`User info updated`,
        data:data
    })

}



module.exports = {userController,updateUserProfile,createCategory,getAllCategory}