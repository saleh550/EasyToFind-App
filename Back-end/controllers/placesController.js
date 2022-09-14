const asyncHandler =require('express-async-handler')
const axios=require('axios')
const { param } = require('../routes/userRoutes')
const fs =require('fs')



//@desc get a current user 
//@route GET /api/users/me
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

    
    // else{
    //   res.status(400)
    //   throw new Error("Not Found Places")
    // }
  res.status(200).json(placesData)
})


module.exports={
    getPlaces
}