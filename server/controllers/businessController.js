const Business = require('../models/Business');
const asyncHandler = require('express-async-handler');
const emailValidator = require("email-validator");
const isUrlValid = require('url-validation');

const axios = require('axios')

//Validate phone number function
function validatePhoneNumber(input_str) {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  
    return re.test(input_str);
  }


  const getLatLngFromAddress = async (address, apiKey) => {
    // Construct the URL for the Geocoding API request
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  
    try {
      // Make the Geocoding API request
      const response = await axios.get(geocodingUrl);
      const data = response.data;
  
      // Check if the response is successful and contains results
      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;
        
        // Return an object with latitude and longitude
        return { latitude, longitude };
      } else {
        throw new Error('Geocoding request failed. Check your address or API key.');
      }
    } catch (error) {
      // Handle errors, e.g., network issues or invalid responses
      throw new Error(`Error: ${error.message}`);
    }
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
    const {name, description, tagline, url, phoneNumber, email, street, city, state, zipCode} = req.body;

    

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

    const address = `${street}, ${city}, ${state} ${zipCode}`
    console.log(address)

    // Call the function and log the result
    try{
        const { latitude, longitude} = await getLatLngFromAddress(address, process.env.GM_API_KEY)
        console.log(latitude, longitude)

        const business = await Business.create({name : name || null, 
            description: description || null, 
            tagline: tagline || null,
            url: url || null,  
            phoneNumber:phoneNumber || null, 
            email: email || null,
            latitude:latitude,
            longitude:longitude,
            address:{
                street:street || null,
                city:city|| null,
                state:state||null,
                zipCode:zipCode || null
            }});
            res.status(200).json({message:'new business created'});

    }catch(error) {
        console.lerror(error.message)
        res.status(400).json({message:'invalid business data recieved / inalid address recieved'});
    }
  
});


// //@desc Edit businesses
// //@route PATCH /businesses
// //@access Private

const editBusiness = asyncHandler(async(req,res) =>{
    const {id,name, description, tagline, url, phoneNumber, email, street, city, state, zipCode} = req.body;
  
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
    business.address.street = street || null
    business.address.city = city || null
    business.address.state = state || null
    business.address.zipCode = zipCode || null
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