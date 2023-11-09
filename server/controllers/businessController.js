const Business = require('../models/Business');
const asyncHandler = require('express-async-handler');
const emailValidator = require("email-validator");
const isUrlValid = require('url-validation');

//Validate phone number function
function validatePhoneNumber(input_str) {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  
    return re.test(input_str);
  }



//@desc Get all businesses
//@route GET /businesses
//@access Private

const getAllBusinesses = asyncHandler(async(req,res) =>{
    //get all businesses from mongodb
    const businesses = await Business.find().lean();

    //check if there are any businesses
    if(!businesses.length){
        return res.status(400).json({message:'no businesses found'});
    };
    //returns businesses in json format
    res.json(businesses);
});

//@desc Create a new business
//@route POST /businesses
//@access Private

const createNewBusiness = asyncHandler(async(req,res) =>{
    const {name, description, tagline, url, address, phoneNumber, email} = req.body;

    //make sure required fields are filled out
    if(!name || !description || !tagline ){
        return res.status(400).json({message:'fields required: name, description, tagline'});
    }

    if(email && !(emailValidator.validate(email))){
        return res.status(400).json({message: 'Please provide a valid email'})
    }

    if(url && !(isUrlValid(url))){
        return res.status(400).json({message: 'Please provide a valid URL (example: https://helloworld.com)'})
    }

    if (phoneNumber && (!validatePhoneNumber(phoneNumber))){
        return res.status(400).json({message:'Please enter a valid 10 digit phone number'})
    }

    //check for duplicate businesses
    const duplicateBiz = await Business.findOne({name, description}).lean().exec();

    if(duplicateBiz){
        return res.status(409).json({message:'that business already exists'});
    };

    const business = await Business.create({name : name || null, 
                                            description: description || null, 
                                            tagline: tagline || null,
                                            url: url || null, 
                                            address:address || null, 
                                            phoneNumber:phoneNumber || null, 
                                            email: email || null});


    if(business){ //if created
        res.status(200).json({message:'new business created'});
    }else{
        res.status(400).json({message:'invalid business data recieved'});
    }
});


// //@desc Edit businesses
// //@route PATCH /businesses
// //@access Private

const editBusiness = asyncHandler(async(req,res) =>{
    const {id,name, description, tagline, url, address, phoneNumber,email} = req.body;
  
    //make sure required fields are filled out
    if(!name || !description || !tagline || !id ){
        return res.status(400).json({message:'fields required: name, description, tagline and id'});
    }

    //Confirm business exists to update
    const business = await Business.findById(id).exec();

    if(!business){
        return res.status(400).json({message:'No business found'})
    }

    if(email && !(emailValidator.validate(email))){
        return res.status(400).json({message: 'Please provide a valid email'})
    }

    if(url && !(isUrlValid(url))){
        return res.status(400).json({message: 'Please provide a valid URL (example: https://helloworld.com)'})
    }

    if (phoneNumber && (!validatePhoneNumber(phoneNumber))){
        return res.status(400).json({message:'Please enter a valid 10 digit phone number'})
    }

    //check for duplicate business
    const duplicateBiz = await Business.findOne({name, description, tagline}).lean().exec();

     // Allow renaming of the original note 
     if (duplicateBiz && duplicateBiz?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate business name and description' })
    }

    business.name = name || null
    business.description = description || null
    business.tagline = tagline || null
    business.url = url || null
    business.address = address || null
    business.phoneNumber = phoneNumber || null
    business.email = email || null

    const updatedBusiness = await business.save(); //comes from the lean 

    res.json({message:`${updatedBusiness.name} was updated`});
})

// //@desc Delete businesses
// //@route DELETE /businesses
// //@access Private

const deleteBusiness = asyncHandler(async(req,res) =>{
    const {id} = req.body;

    //confirm id
    if(!id){
        return res.status(400).json({message:'id required'})
    }

    //Confirm business exists to delete
    const business = await Business.findById(id).exec();

    if(!business){
        return res.status(400).json({message:'No business found'})
    }

    const result =  await business.deleteOne()

    res.json(`business with id ${result.id} has been deleted`)

})

module.exports = {
    getAllBusinesses,
    createNewBusiness,
    editBusiness,
    deleteBusiness
}