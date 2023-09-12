const Business = require('../models/Business');
const asyncHandler = require('express-async-handler');

//@desc Get all businesses
//@route GET /businesses
//@access Private

const getAllBusinesses = asyncHandler(async(req,res) =>{
    //get all businesses from mongodb
    const businesses = await Business.find().lean()

    //check if there are any businesses
    if(!businesses){
        return res.status(400).json({message:'no users found'})
    }
    res.json(businesses)
})

//@desc Create a new business
//@route POST /businesses
//@access Private

// const createNewBusiness = asyncHandler(async(req,res) =>{

// })


// //@desc Edit businesses
// //@route PATCH /businesses
// //@access Private

// const editBusiness = asyncHandler(async(req,res) =>{

// })

// //@desc Delete businesses
// //@route DELETE /businesses
// //@access Private

// const deleteBusiness = asyncHandler(async(req,res) =>{

// })

module.exports = {
    getAllBusinesses,
    // createNewBusiness,
    // editBusiness,
    // deleteBusiness
}