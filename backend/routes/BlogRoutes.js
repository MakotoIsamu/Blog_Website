const express = require('express');
const Blog = require('../models/BlogModel');
const multer = require('multer')
const cloudinary = require('../config/CloudinaryConfig')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blog_images', // You can specify the folder where the images will be stored
        allowedFormats: ['jpg', 'png'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional image transformations
    },
});

const upload = multer({storage})

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const allBlogs = await Blog.find();
        res.status(200).json({blogs: allBlogs});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get blog by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json({blog: blog});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new blog
router.post('/create', upload.single('image'), async (req, res) => {
    try {
        const { title, description, author, category } = req.body;
        const image = req.file.path; // Assuming multer stores the file path in req.file

        const newBlog = new Blog({ image, title, description, author, category });
        await newBlog.save();

        res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Edit a blog
router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { image, title, description, author, category } = req.body;
        
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { image, title, description, author, category },
            { new: true } // Returns the updated document
        );
        
        if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a blog
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        
        if (!deletedBlog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
 