const express=require('express')
const router=express.Router()
const {getPlaces}=require('../controllers/placesController')



router.post('/places',getPlaces)



module.exports=router