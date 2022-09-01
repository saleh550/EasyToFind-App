const mongoose  =require('mongoose')
var passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate=require('mongoose-findorcreate')


const userSchema=mongoose.Schema({
    
    name:{
        type:String,
        required:[true,'Please add a name .']
    },
    email:{
        type:String,
        required:[false,'Please add your email']

    },
    password:{
        type:String,
        required:[false,'Please add your password']

    },
    phoneNumber:{
        type:String,
        required:[false,'Please add a phone number']
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    googleId:{
        type:String,
        default:null
    },
    imageUrl:{
        type:String,
        default:null
    }

},{timestamp:true})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports=mongoose.model('User',userSchema)