const mongoose=require('mongoose')


const GeoSchema = mongoose.Schema({
    type: {
      type: String,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    }
  })

const placeSchema=mongoose.Schema({
    google_id:{
        type:String,
        default:null
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
       }],
    name:{
        type:String,
        require:[true,'pleas add a name .']
    },
    location:GeoSchema,
    phone:{
        type:String,
        required:[true,'please add phone number']
    },
    email:{
        type:String,
        required:[false,'Please add your email']
    },
    password:{
        type:String,
        required:[true,'please add password']
    },
    description:{
        type:String,
    },
    opening_hours:{
        sun: {
            start:String ,
            end:String ,
            isOpen:Boolean
        },
        mon: {
            start:String ,
            end:String ,
            isOpen:Boolean
        },
        tue: {
            start:String ,
            end:String ,
            isOpen:Boolean
        },
        wed: {
            start:String ,
            end:String ,
            isOpen:Boolean
        },
        thu: {
            start:String ,
            end:String ,
            isOpen:Boolean
        },
        fri: {
            start:String ,
            end:String ,
            isOpen:Boolean
        },
        sat: {
            start:String ,
            end:String ,
            isOpen:Boolean
        },
    },
    facebook_url:{
        type:String,
        default:null
    },
    instagram_url:{
        type:String,
        default:null
    },  
    whatsapp_url:{
        type:String,
        default:null
    },
    images:[]

},{timestamp:true})

module.exports=mongoose.model('Place',placeSchema)