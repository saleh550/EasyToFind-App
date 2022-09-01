const express=require('express')
const router=express.Router()
const {registrUser,loginUser,getMe, loginWithGoogle,test}=require('../controllers/userController')
const {protect}=require('../middleware/authMiddleware')


 let user={}
router.post('/',registrUser)
router.post('/login',loginUser)
router.post('/google',loginWithGoogle)
router.get('/me',protect,getMe)


module.exports=router