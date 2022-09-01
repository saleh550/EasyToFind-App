const express=require('express')
const router=express.Router()
const {registrUser,loginUser,getMe, loginWithGoogle,test}=require('../controllers/userController')
const {protect}=require('../middleware/authMiddleware')
const passport=require('passport')

 let user={}
router.post('/',registrUser)
router.post('/login',loginUser)
router.post('/google',loginWithGoogle)
//  router.get('/google',passport.authenticate('google', { scope: ["profile"] }))
//  router.get('/google/barbershop',passport.authenticate('google', { failureRedirect: '/api/users' }),loginWithGoogle)
router.get('/me',protect,getMe)


module.exports=router