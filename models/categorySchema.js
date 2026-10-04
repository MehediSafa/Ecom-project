const mongoose = require('mongoose')
const {Schema} = mongoose

const categorySchema = new Schema({
    name: {
        type:String,
        required:true,
        unique:true
    },
    status: {
        type:String,
        enum:['active','deactive','pending'],
        default: 'deactive'
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    subCategory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'SubCategory'
        }
    ]
    
})

module.exports = mongoose.model('Category',categorySchema)