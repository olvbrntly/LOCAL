const mongoose = require('mongoose')
const typeURL = require('mongoose-type-url')


const businessSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        address:{
            street:String,
            city:String,
            state:String,
            postalCode:String,
        },
        email:{
            type: String,
        },
        description:{
            type:String,
            required:true,
        },
        tagline:{
            type:String,
            required:true
        },
        url:{
            type:typeURL,
        },
        phoneNumber: {
            type: String,
            //match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/, // FORMATS: (123) 456-7890 or 123-456-7890
        },

    }
)

module.exports = mongoose.model('Business', businessSchema)