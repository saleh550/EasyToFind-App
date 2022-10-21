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
    opening_hours:[{
        sun: {
            start: { type: Number, min: 0, max: 23 },
            end: { type: Number, min: 0, max: 23 },
        },
        mon: {
            start: { type: Number, min: 0, max: 23 },
            end: { type: Number, min: 0, max: 23 },
        },
        tue: {
            start: { type: Number, min: 0, max: 23 },
            end: { type: Number, min: 0, max: 23 },
        },
        wed: {
            start: { type: Number, min: 0, max: 23 },
            end: { type: Number, min: 0, max: 23 },
        },
        thu: {
            start: { type: Number, min: 0, max: 23 },
            end: { type: Number, min: 0, max: 23 },
        },
        fri: {
            start: { type: Number, min: 0, max: 23 },
            end: { type: Number, min: 0, max: 23 },
        },
        sat: {
            start: { type: Number, min: 0, max: 23 },
            end: { type: Number, min: 0, max: 23 },
        },
    }],
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
    images:[{
        url:String
    }]

},{timestamp:true})

module.exports=mongoose.model('Place',placeSchema)