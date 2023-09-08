const mongoose = require('mongoose')

const businessSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        address:{
            type:String, //placeholder for now, will get changed to address schema
            required:true
        },
        description:{
            type:String,
            required:true,
        },
        priceRange:{
            type:String,
            required:true
        },
        
    }
)