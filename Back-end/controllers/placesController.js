const asyncHandler =require('express-async-handler')
const bcrypt=require('bcryptjs')
const Place=require('../models/placeModel')
const User=require('../models/userModel')
const axios=require('axios')
const { param } = require('../routes/userRoutes')
const fs =require('fs')
const e = require('express')
const { findOne } = require('../models/placeModel')



//@desc get places from google maps
//@route GET /api/maps/places
//@access public
const getPlaces=asyncHandler( async(req,res)=>{
const {textSearch}=req.body
let placesData=[];
//REQUEST places ides
try {
  let url=process.env.GOOGLE_URL_REQUEST_PLACES+"query="+textSearch+"&key="+process.env.GOOGLE_API_KEY
    url=decodeURI(url)
    url=encodeURI(url)
    const response=await axios.get(url)
  
    if(response.data.status==="OK"){
      await Promise.all( response.data.results.map(async element => {
        const detailsResponse=await axios(process.env.GOOGLE_URL_REQUEST_DETAILS+"place_id="+element.place_id+"&key="+process.env.GOOGLE_API_KEY)
        
        if(detailsResponse.data.status==="OK"){
          let photo_references=[];
          if(detailsResponse.data.result.photos){
            detailsResponse.data.result.photos.map(photo=>photo_references.push(photo.photo_reference))
          }
          placesData.push({
            _id:detailsResponse.data.result.place_id,
            name:detailsResponse.data.result.name,
            formatted_address:detailsResponse.data.result.formatted_address ,
            rating:element.rating,
            photos:detailsResponse.data.result.photos?photo_references:null,
            isOpen:detailsResponse.data.result.opening_hours?detailsResponse.data.result.opening_hours.open_now:null,
            type:detailsResponse.data.result.types[0],
            web_site:detailsResponse.data.result.website?detailsResponse.data.result.website:null,
          }) 
        }
      }));
    }
} catch (error) {
  res.status(400).json("Not Found Places !")
  throw new Error("Not found places !")
  
} 
  res.status(200).json(placesData)
})

//@desc create new place by client 
//@route POST /api/maps/create/place
//@access public
const createPlace=asyncHandler(async(req,res)=>{
  console.log(req.body.id)
  const {
    google_id,
    email,
    password,
    name,
    phone,
    description,
    facebook_url,
    instagram_url,
    whatsapp_url,
  }=req.body


  //check if the email exist in the data base
  const emailExist=await Place.findOne({email:email})
  if(emailExist){
    res.status(400)
    throw new Error("email already exists ! ")
  }

  //Hash password
  const salt =await bcrypt.genSalt(10)
  const hashedPassword=await bcrypt.hash(password,salt)
   

  //create new place
  const place= Place.create({
    google_id:google_id,
    name:name, 
    email:email,
    password:hashedPassword,
    phone:phone,
    location:{
      type: "Point",
      coordinates: [-73.856077, 40.848447]
    },
    description:description,
    facebook_url:facebook_url,
    instagram_url:instagram_url,
    whatsapp_url:whatsapp_url,
    opening_hours:[{
      sun:{start:8.5,end:20.5},
      mon:{start:8.5,end:20.5},
      tue:{start:8.5,end:20.5},
      wed:{start:8.5,end:20.5},
      thu:{start:8.5,end:20.5},
      fri:{start:8.5,end:20.5},
      sat:{start:8.5,end:20.5},

    }]

  }).then(place=>{
    if(place){
      res.json(place)
      return place
    }else{
      res.status(500)
      throw new Error("Something Wrong!")
    }
    
  })
  
  
})

//@desc check if the place exist 
//@route POST /api/maps/check/place
//@access public
const checkPlace=asyncHandler(async(req,res)=>{
 
  const {googleId}=req.body
  try{
    const placeExist= await Place.findOne({google_id:googleId})
    if(placeExist){
      res.json({place:placeExist,isExist:true})
    }else{
      res.json({isExist:false})
    }
  }catch(error){
    res.status(500)
    throw new Error("Something is Wrong !")
  }
  
})

module.exports={
    getPlaces,
    createPlace,
    checkPlace
}