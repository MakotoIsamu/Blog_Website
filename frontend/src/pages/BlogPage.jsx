import React, { useState, useEffect } from 'react'
import { Backend_Url } from '../utils'
import { Link } from 'react-router-dom'

const BlogPage = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        fetch(`${Backend_Url}/api/blog/`)
            .then(res => res.json())
            .then(data => setBlogs(data.blogs))
    }, [])

  return (
    <div className='p-8 flex flex-col items-center justify-center min-h-screen bg-[#111111]'>
        <h1 className='text-5xl font-bold mb-8 text-center text-white'>Blog Page</h1>
        <div className='flex flex-wrap gap-6 w-full justify-center'>
            {blogs.map((blog) => (
                <Link 
                    key={blog._id} 
                    to={`/blog/${blog._id}`}  
                    className='bg-[#1a1a1a] hover:bg-[#2c2c2c] transition-all duration-300 border border-gray-700 rounded-lg p-4 cursor-pointer shadow-lg max-w-xs'
                >
                    <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className='w-full h-48 object-cover rounded-md mb-4' 
                    />
                    <h2 className='text-2xl font-semibold text-white mb-2'>{blog.title}</h2>
                    <p className='text-gray-400 text-sm line-clamp-3 mb-4'>{blog.content}</p>
                    <div className='flex justify-between items-center'>
                        <span className='text-gray-500 text-sm'>{blog.author}</span>
                        <span className='text-gray-500 text-sm'>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default BlogPage
