const express=require('express')
const dotenv=require('dotenv').config()
const colors=require('colors')
const connectDB=require('./config/db')
const {errorHandler}=require('./middleware/errorMiddleware')
const POST=process.env.PORT || 5000

const app=express()

//Connect to DB
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/',(req,res)=>{
    res.status(200).json({message:'Hello world!'})
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(POST,()=>{
    console.log(`server started on port ${POST}`)
})