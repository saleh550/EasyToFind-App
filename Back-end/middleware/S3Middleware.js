require('dotenv').config()
const { S3Client } = require('@aws-sdk/client-s3')
const multer=require('multer')
const multerS3=require('multer-s3')




const s3=new S3Client({
    region: process.env.S3_BUCKET_REGION,
    credentials:{
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    }
})
const BUCKET=process.env.S3_BUCKET_NAME
const upload=multer({
    storage:multerS3({
        bucket:BUCKET,
        s3:s3,
        
        metadata: function (req, file, cb) {
            
            cb(null, {
                
              fieldName: file.fieldname
            });
          },
        key:(req,file,cb)=>{
            cb(null,`${file.fieldname}/image-${Date.now()}.png`);//profileImage/.. ,that give the file path in the bucket s3
        }
    })
})
module.exports={upload}
