require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const BlogRoutes = require('./routes/BlogRoutes')
const AuthRoutes = require('./routes/AuthRoutes')
const cors = require('cors')

const app = express() 

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB')
})
.catch((err) => {
    console.log(err)
})

app.use('/api/blog' , BlogRoutes)
app.use('/api/auth' , AuthRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`)
})
