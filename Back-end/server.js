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
const cors=require('cors');
const { options } = require('./routes/userRoutes');



const app=express()
app.use(cors())
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(cors())



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


app.get('/',(req,res)=>{
    res.status(200).json({message:'Hello world!'})
})



 passport.use(User.createStrategy());

 passport.serializeUser(function(user,done){
    done(null,user.id)
 });
 passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        done(err,user)
    })
 });


   //google Oauth20
   passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/users/google/barbershop",
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
    
  },
  function(accessToken, refreshToken,email, profile, cb) {
    
    User.findOrCreate({ googleId: profile.id ,name:profile.displayName,phoneNumber:''}, function (err, user) { 
       
      return cb(err, user);
    });
    
  }
));

//Routes
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)



// app.get('/api/users/google',
//   passport.authenticate('google', { scope: ['profile'] })
//  );

// app.get('/api/users/google/barbershop', 
//   passport.authenticate('google', { failureRedirect: '/api/users' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//    res.status(200).json("loggedin")

//   });


app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})