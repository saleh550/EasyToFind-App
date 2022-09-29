const express=require('express')
const router=express.Router()
const {registrUser,loginUser,getMe,updateUser,changePassword, loginWithGoogle,test}=require('../controllers/userController')
const {protect}=require('../middleware/authMiddleware')


 let user={}
router.post('/',registrUser)
router.post('/login',loginUser)
router.post('/google',loginWithGoogle)
router.get('/me',protect,getMe) 
router.put('/update/:id',updateUser)
router.put('/update/password/:id',changePassword)


module.exports=router