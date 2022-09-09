const asyncHandler =require('express-async-handler')
const axios=require('axios')



//@desc get a current user 
//@route GET /api/users/me
//@access public
const getPlaces=asyncHandler( async(req,res)=>{

    const {data}=await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyAtASMPhwoz5dZSeYM2Y4ATJoH4TlAyM4Y&query=מסעדה')
    console.log(data)
  res.json('s')
})


module.exports={
    getPlaces
}