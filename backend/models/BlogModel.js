const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    author: String,
    category: String
},{
    timestamps: true
})

module.exports = mongoose.model('Blog' , BlogSchema)


