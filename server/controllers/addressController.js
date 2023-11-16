const Address = require('../models/Address');
const asyncHandler  = require('express-async-handler')


//@desc Get all businesses
//@route GET /businesses
//@access Private

const getAllAddresses = asyncHandler(async(req,res) =>{
    //get all addresses from mongodb
    const addresses = await Address.find().lean();

    //check is there are any addresses in database
    if(!addresses.length){
        return res.status(400).json({message:'no addresses found'})
    }

    //return addresses in json form
    res.json(addresses)
})

//@desc Create a new business
//@route POST /businesses
//@access Private

const createNewAddress = asyncHandler(async(req,res) =>{
    return 
})


// //@desc Edit businesses
// //@route PATCH /businesses
// //@access Private

const editAddress = asyncHandler(async(req,res) =>{
    return 
})


// //@desc Delete businesses
// //@route DELETE /businesses
// //@access Private


const deleteAddress = asyncHandler(async(req,res) =>{
    return 
})

module.exports = {
    getAllAddresses,
    createNewAddress,
    editAddress,
    deleteAddress
}