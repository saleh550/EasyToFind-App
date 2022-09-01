const asyncHandler =require('express-async-handler')
const bcrypt=require('bcryptjs')
const jwt=require('JsonWebToken')
const User=require('../models/userModel')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require('passport')
const { findOne, create } = require('../models/userModel')


 const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{ 
        expiresIn:'30d'
    })
}



//@desc register a new user
//@route POST /api/users
//@access publice
const registrUser=asyncHandler( async(req,res)=>{
    const {name,email,password,phoneNumber}=req.body
    if(!name||!email||!password||!phoneNumber){
        res.status(400)
        throw new Error('Please include all fields')
    }

    //find if user already exist 
    const userExist=await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('User already exists!')
    }

    //Hash password
    const salt =await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    

    //create user
    const user=await User.create({
        name,
        email,
        phoneNumber,
        password:hashedPassword,
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:password,
            phoneNumber:user.phoneNumber,
            token:generateToken(user._id)
        })
        
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

    

})

//@desc login user
//@route POST /api/users/login
//@access publice
const loginUser=asyncHandler( async(req,res)=>{
    const {email,password}=req.body

    if(!email||!password){
        res.status(400)
        throw new Error('Please include all fields')
    }
    //find user with current email from the DB
    const user=await User.findOne({email})
    
    
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            isAdmin:user.isAdmin,
            email:user.email,
            password:user.password,
            phoneNumber:user.phoneNumber,
            token:generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error("validation faild")
    }

})


//@desc get a current user 
//@route GET /api/users/me
//@access private
const getMe=asyncHandler( async(req,res)=>{
    res.status(200).json(req.user)
})

//@desc login user with google
//@route POST /api/users/google
//@access private
const loginWithGoogle=asyncHandler( async(req,res)=>{
    const {email,name,googleId,imageUrl}=req.body
    console.log(googleId)
    

    if(!googleId){
        res.status(400)
        throw new Error('login with google failed')
    }else{
            //find user with current googleId from the DB
            const user=await User.findOne({googleId:googleId})
            if(user){
             res.status(200).json({
                _id:user._id,
                name:user.name,
                isAdmin:user.isAdmin,
                email:user.email,
                googleId:user.googleId,
                phoneNumber:user.phoneNumber,
                imageUrl:user.imageUrl,
                token:generateToken(user._id)
             })
       
            }  
            else{
               const newUser=await User.create({
                    email,name,googleId,imageUrl
                })
                if(newUser){
                    res.status(201).json({
                        _id:newUser._id,
                        name:newUser.name,
                        isAdmin:newUser.isAdmin,
                        email:newUser.email,
                        googleId:newUser.googleId,
                        phoneNumber:newUser.phoneNumber,
                        imageUrl:newUser.imageUrl,
                        token:generateToken(newUser._id),
                        created:true
                    })
                }
            //     console.log(newUser)
            // res.status(200).json(newUser)
            }
    }
   
    
    // if(user ){
    //     res.status(200).json({
    //         _id:user._id,
    //         name:user.name,
    //         isAdmin:user.isAdmin,
    //         email:user.email,
    //         password:user.password,
    //         phoneNumber:user.phoneNumber,
    //         token:generateToken(user._id)
    //     })
    // }else{
    //     res.status(401)
    //     throw new Error("Error Login With Google")
    // }

})



module.exports={
    registrUser, 
    loginUser,
    loginWithGoogle,
    getMe
}