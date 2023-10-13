const Business = require('../models/Business');
const asyncHandler = require('express-async-handler');

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
    const {name, description, tagline, url, address, phoneNumber} = req.body;

    //make sure required fields are filled out
    if(!name || !description || !tagline ){
        return res.status(400).json({message:'fields required: name, description, tagline'});
    }

    //check for duplicate businesses
    const duplicateBiz = await Business.findOne({name, description}).lean().exec();

    if(duplicateBiz){
        return res.status(409).json({message:'that business already exists'});
    };

    const business = await Business.create({name, description, tagline, url, address, phoneNumber });

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
    const {id,name, description, tagline, url, address, phoneNumber} = req.body;
  
    //make sure required fields are filled out
    if(!name || !description || !tagline || !id ){
        return res.status(400).json({message:'fields required: name, description, tagline'});
    }

    //Confirm business exists to update
    const business = await Business.findById(id).exec();

    if(!business){
        return res.status(400).json({message:'No business found'})
    }

    //check for duplicate business
    const duplicateBiz = await Business.findOne({name, description}).lean().exec();

    if(duplicateBiz){
        return res.status(409).json({message:'that business already exists'});
    };

     // Allow renaming of the original note 
     if (duplicateBiz && duplicateBiz?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate business name and description' })
    }

    business.name = name,
    business.description = description,
    business.tagline = tagline,
    business.url = url,
    business.address = address,
    business.phoneNumber = phoneNumber

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