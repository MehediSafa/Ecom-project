const mongoose = require('mongoose')
const {Schema} = mongoose

const subCategorySchema = new Schema({
    name: {
        type:String,
        required:true,
        unique:true
    },
    status: {
        type:String,
        enum:['active','deactive','pending'],
        defaul: 'deactive'
    },
    parentCategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
})

module.exports = mongoose.model('SubCategory',subCategorySchema)