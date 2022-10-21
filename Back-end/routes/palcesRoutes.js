const express=require('express')
const router=express.Router()
const {getPlaces,createPlace,checkPlace}=require('../controllers/placesController')
const {protect}=require('../middleware/authMiddleware')



router.post('/places',getPlaces)
router.post('/create/place',createPlace)
router.route('/check/place').post(checkPlace)



module.exports=router