const mongoose = require('mongoose');

const userSchema = new mongoose.Scehema({
   username:{
        type:String,
        required:true
   },
   password:{
        type:String,
        required:true
   },
   isAdmin:{
        type:Boolean,
        default:false
   },

})

module.exports = mongoose.model('User', userSchema)