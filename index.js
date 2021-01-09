const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const bodyParser = require('body-parser')

// import routers //
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')


const app = express()
app.use(cors())

//db connect //
 mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true} ,()=>{
        console.log("connected");
})

app.use(bodyParser.json())

//route middleware
app.use("/api/user", authRoute)
app.use("/api/posts", postRoute)

app.listen(3000, ()=>{
    console.log("server listening....");
})