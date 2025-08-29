const Blog = require('../models/blogModel');
const uploadOnCloudinary = require('../utils/fileUploading')
const User = require('../models/userModel')



// Create a new blog post
const addBlog = async (req, res) => {
    const blogImagePath = req.file?.path;
    // console.log(req.file);
    const fileUploaded = await uploadOnCloudinary(blogImagePath);
    try {
        const blog = new Blog({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            caption:req.body.caption,
            blogImage: fileUploaded?.url || "https://cdn.pixabay.com/photo/2016/07/30/19/47/banner-1557834_1280.jpg",
            tags: req.body.tags
        });
        const savedBlog = await blog.save();

        const user = await User.findById(req.body.author);
        // console.log(user._id);
        if (user) {
            user.post.push(savedBlog._id);
            await user.save();
            blog.authorName = user.fullName
            await blog.save();
        }
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all blog posts 
const showBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific blog post by ID
const showSingleBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a blog post by ID
const updateBlog = async (req, res) => { 
    
    try {
        await Blog.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        // console.log(req.body);
        res.status(200).json("updated blog")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBlogImage = async(req,res)=>{
    const blogImagePath = req.file?.path;
        // console.log(req.file);
    const fileUploaded = await uploadOnCloudinary(blogImagePath);
    try {
        await Blog.findByIdAndUpdate(req.params.id, {
            $set: {
                blogImage:fileUploaded?.url || "https://cdn.pixabay.com/photo/2016/07/30/19/47/banner-1557834_1280.jpg"
            }
        }, { new: true })
        // console.log(req.body);
        res.status(200).json("updated blog image")
    } catch (error) {
        res.status(500).json({ message: error.message });

        
    }
}

// Delete a blog post by ID
//delete Blogs
const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id)
        res.status(200).json("Blog Deleted")
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}


module.exports = {
    showBlogs,
    addBlog,
    showSingleBlog,
    updateBlog,
    updateBlogImage,
    deleteBlog,
}
