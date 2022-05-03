const path= require('path')
const express = require('express')
const colors = require('colors')
const fileupload = require('express-fileupload')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
const cors =require('cors')

const app = express()

app.use(cors())

// Connect to database
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res) =>{
    res.status(200).json({message:'Welcome to the Animal recognition app'})
})

// File uploading
app.use(fileupload())

// Set static folder
app.use(express.static(path.join(__dirname,'public')))

//Routes
app.use('/api/animals',cors(),require('./routes/animalRoutes'))

// Serve Frontend
if(process.env.NODE_ENV === 'production'){

    //Set build folder as static
    app.use(express.static(path.join(__dirname,'../frontend,build')))

    app.get('*',(req,res) => res.sendFile(__dirname,'../','frontend','build','index.html'))
    } else {
        app.get('/',(req,res) =>{
            res.status(200).json({message:'Welcome to the Animal Speech APP'})
        })
    }


app.use(errorHandler)

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))
