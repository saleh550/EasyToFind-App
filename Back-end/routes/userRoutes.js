const express=require('express')
const router=express.Router()
const {registrUser,loginUser,getMe,updateUser,changePassword, loginWithGoogle,uploadImage,test}=require('../controllers/userController')
const {protect}=require('../middleware/authMiddleware')
const {upload}=require('../middleware/S3Middleware')


 let user={}
router.post('/',registrUser) 
router.post('/login',loginUser)
router.post('/google',loginWithGoogle)
router.get('/me',protect,getMe) 
router.put('/update/:id',updateUser)
router.put('/update/password/:id',changePassword)
router.post('/upload/image/:id',upload.single("profileImage"), uploadImage)


module.exports=router