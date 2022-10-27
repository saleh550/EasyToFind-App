const path =require('path')
const express=require('express')
const dotenv=require('dotenv').config()
const colors=require('colors')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require('passport')
const session=require('express-session')
const connectDB=require('./config/db')
const {errorHandler}=require('./middleware/errorMiddleware')
const PORT=process.env.PORT || 5000
const User=require('./models/userModel');
const { options } = require('./routes/userRoutes');
const cors =require("cors")



const app=express()


app.use(cors());

app.use(session({
    secret:'our secret',
    resave:false,
    saveUninitialized:false
    
}))
 app.use(passport.initialize())
app.use(passport.session())



//Connect to DB
connectDB()



app.use(express.json())
app.use(express.urlencoded({extended: true}))






 passport.use(User.createStrategy());

 passport.serializeUser(function(user,done){
    done(null,user.id)
 });
 passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        done(err,user)
    })
 });


   

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/maps',require('./routes/palcesRoutes'))

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'../frontend')))

    app.get('*',(req,res)=>res.sendFile(__dirname,'../','frontend','build','index.html'))
}else{
    app.get('/',(req,res)=>{
        res.status(200).json({message:'Welcome to the EasytoFind API!'})
    })
}


app.use(errorHandler)



app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})