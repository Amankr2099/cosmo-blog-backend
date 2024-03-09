require('dotenv').config()
const connectDB = require('./db/connectDB')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
// const corsOption = require('../src/middlewares/corsMiddleware')
const app = express()


//some configurations (middlewares)
app.use(express.urlencoded({extended:true}))  //to use url encoding
app.use(express.json())                       //to use json methods

app.use(express.static("public"))             //to make public folder static
app.use(cookieParser())
// app.use(cors(corsOption))
app.use(cors({
    origin:process.env.CORS_ORIGIN,
}))


//routes
const userAPI = require('./routes/userRoutes')
const blogAPI = require('./routes/blogRoutes')
 
app.get('/',(req,res)=>{
    res.send("It works...")
})
app.use('/api/user',userAPI)
app.use('/api/blogs',blogAPI)


const connectFunction = async()=>{
    await connectDB()
    .then(()=>{
        app.listen(process.env.PORT || 8000,()=>{
            console.log(`Server initiated at ${process.env.PORT}`);
        })
        app.on('error',(error)=>{
            console.log('Server error :',error);
        })
    })
    .catch((err)=>{
        console.log(err);
    })
}

connectFunction()