
let Cat = require('../models/categorySchema.js')
let SubCat = require('../models/subCategorySchema.js')



//create category

let createCategory =  async (req,res) => {
    let {name,owner} = req.body

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
        name:name.toLowerCase(),
        owner:owner
    })

    await cat.save()

    res.status(201).json({
            success:true,
            message:'Category created'
        })
}


//find all category

let getAllCategory = async (req,res)=>{

    let category = await Cat.find({}).populate('owner')
    res.status(200).json({
        success:true,
        message:"All category",
        data:category
    })
}

//send email after categor has been created


//create subcategory

let createSubCategory = async (req,res) => {
     let {name,parentCategory} = req.body

    if(!name){
        return res.status(201).json({
            success:false,
            message:'Please enter a category'
        })
    }

    let existingName = await SubCat.findOne({name:name.toLowerCase() })

    if(existingName){
        return res.status(201).json({
            success:false,
            message:'Category already exists'
        })
    }

    let subCat = new SubCat({
        name:name.toLowerCase(),
        parentCategory:parentCategory
    })

    await subCat.save()

    res.status(201).json({
            success:true,
            message:'Subcategory created'
    })
}

//show all subcategory

let getAllSubCategory = async (req,res)=>{

    let subCategory = await SubCat.find({}).populate('parentCategory')
    res.status(200).json({
        success:true,
        message:"All Sub category",
        data:subCategory
    })
}


//show all category wise sub category

let getAllCategoryWiseSubCategory = async (req,res)=>{
     let {id} = req.params
    let subCategory = await SubCat.find({parentCategory:id}) // if want to populate the just populate('parentCategory')
    res.status(200).json({
        success:true,
        message:"All Sub category",
        data:subCategory
    })
}

//show category under ownser

let getAllOwnerWiseCategory = async (req,res) =>{
    let {id} = req.params
    let data = await Cat.find({owner:id})

    res.status(200).json({
        success:true,
        message:"All category",
        data:data
    })
}



module.exports = {createCategory,getAllCategory,createSubCategory,getAllSubCategory,getAllCategoryWiseSubCategory,getAllOwnerWiseCategory}