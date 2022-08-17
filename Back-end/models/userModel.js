const mongoose=require('mongoose')


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name .']
    },
    email:{
        type:String,
        required:[true,'Please add your email']

    },
    password:{
        type:String,
        required:[true,'Please add your password']

    },
    phoneNumber:{
        type:String,
        required:[true,'Please add a phone number']
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }

},{timestamp:true})

module.exports=mongoose.model('User',userSchema)