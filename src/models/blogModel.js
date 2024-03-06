const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    authorName:{
        type:String,
    },
    blogImage:{
        type:String,
        default:"Alien Friend"
    },
   
},{timeseries:true});



const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
