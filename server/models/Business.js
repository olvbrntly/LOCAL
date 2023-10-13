const mongoose = require('mongoose')
const typeURL = require('mongoose-type-url')
const AddressSchema = require('./Address')

const businessSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        address:{
            type: AddressSchema.schema
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
            match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/, // FORMATS: (123) 456-7890 or 123-456-7890
        },

    }
)

module.exports = mongoose.model('Business', businessSchema)