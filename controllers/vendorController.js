
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

      if(!owner){
        return res.status(201).json({
            success:false,
            message:'Owner does not exist'
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

    // using populate to add owner info inside category and therefore enabling 'select'
    let category = await Cat.find({}).populate({
        path:'owner',
        select :'-password'
        })
    res.status(200).json({
        success:true,
        message:"All category",
        data:category
    })
}




//send email after categor has been created


//update category

//update category

let updateCategory = async (req, res) => {
    let { id } = req.params
    let { name, status } = req.body

    if (name) {
        name = name.toLowerCase()


        // checks another category doesnt already use this name
        let existingName = await Cat.findOne({ name: name, _id: { $ne: id } }) 

        if (existingName) {
            return res.status(400).json({
                success: false,
                message: 'Category already exists'
            })
        }
    }

    const category = await Cat.findByIdAndUpdate(
        id,
        { name: name, status: status },
        { new: true }
    )

    if (!category) {
        return res.status(404).json({
            success: false,
            message: 'Category not found'
        })
    }

    res.status(200).json({
        success: true,
        message: 'Category updated',
        data: category
    })
}

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

    
    let subCategory = await SubCat.find({}).populate('parentCategory')   //populated to see category info 
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



//show category under owner

let getAllOwnerWiseCategory = async (req, res) => {
    let { id } = req.params

    let data = await Cat.find({ owner: id })
    .populate(
            { path: 'owner', 
            select: '-password' 
            }).lean()

    let cat = []

    for (let item of data) {
        let giveSubCat = await SubCat.find({ parentCategory: item._id }).lean()

        cat.push({
            ...item,
            subCategory: giveSubCat
        })
    }

    res.status(200).json({
        success: true,
        message: "All Subcategory Created by Owner",
        data: cat
    })
}



module.exports = {createCategory,getAllCategory,createSubCategory,getAllSubCategory,getAllCategoryWiseSubCategory,getAllOwnerWiseCategory,updateCategory}