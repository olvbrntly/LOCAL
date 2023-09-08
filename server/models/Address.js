const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
    {
        buildingNum:{
            type:String,
        },
        streetName:{
            type:String,
        },
        city:{
            type:String,
        },
        state:{
            type:String,
        },
        zip:{
            type:String
        }
    }
)

module.exports = mongoose.model('Address', addressSchema)