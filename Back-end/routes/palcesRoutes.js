const express=require('express')
const router=express.Router()
const {getPlaces,createPlace,checkPlace,uploadImages}=require('../controllers/placesController')
const {protect}=require('../middleware/authMiddleware')
const {upload}=require('../middleware/S3Middleware')



router.post('/places',getPlaces)
router.post('/create/place',createPlace)
router.route('/check/place').post(checkPlace)
router.post('/upload/images',upload.array("businessImages"), uploadImages)



module.exports=router