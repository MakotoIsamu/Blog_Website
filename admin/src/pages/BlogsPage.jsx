import React, { useState, useEffect } from 'react';
import { Backend_Url } from '../utils';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogsPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [EditModal, setEditModal] = useState(false);
  const [editBlog, setEditBlog] = useState(null); // Track the blog being edited

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('author', author);
      formData.append('image', image);

      const response = await fetch(`${Backend_Url}/api/blog/create`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      toast.success(data.message);
      setTitle('');
      setDescription('');
      setCategory('');
      setAuthor('');
      setImage(null);
      fetchBlogs(); // Fetch updated blogs after creation
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error('Error creating blog');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${Backend_Url}/api/blog/`);
      const data = await response.json();
      setBlogs(data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('author', author);

      const response = await fetch(`${Backend_Url}/api/blog/edit/${editBlog._id}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      toast.success(data.message);
      setEditModal(false); // Close modal after successful update
      fetchBlogs(); // Fetch updated blogs after editing
    } catch (error) {
      console.error('Error editing blog:', error);
      toast.error('Error editing blog');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${Backend_Url}/api/blog/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      toast.success(data.message);
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Error deleting blog');
    }
  };

  const handleEditClick = (blog) => {
    setEditBlog(blog); // Set blog data to be edited
    setTitle(blog.title);
    setDescription(blog.description);
    setCategory(blog.category);
    setAuthor(blog.author);
    setEditModal(true); // Open modal
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <ToastContainer position="top-right" autoClose={3000} />
      <header className="bg-slate-900 py-6 mb-8">
        <h1 className="text-4xl font-bold text-white text-center">
          Admin Dashboard - Blog Management
        </h1>
      </header>
      <div className="container mx-auto px-4 pb-8">
        {/* Create Blog Form */}
        <div className="bg-slate-900 rounded-lg shadow-lg mb-8 p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">Create New Blog Post</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <textarea
              placeholder="Blog Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 rounded-md bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Author Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="relative">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full px-4 py-2 rounded-md bg-slate-800 border border-slate-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
            >
              Create Blog Post
            </button>
          </form>
        </div>

        {/* Blog Posts Table */}
        <div className="bg-slate-900 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">Blog Posts</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-white">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 py-3 rounded-tl-lg">Title</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Author</th>
                  <th className="px-6 py-3 rounded-tr-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">{blog.title}</td>
                    <td className="px-6 py-4 max-w-xs truncate">{blog.description}</td>
                    <td className="px-6 py-4">{blog.category}</td>
                    <td className="px-6 py-4">{blog.author}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(blog)} // Pass blog data to edit
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {EditModal && (
          <div className="fixed inset-0 bg-slate-950/50 flex justify-center items-center">
            <div className="bg-slate-900 rounded-lg shadow-lg p-6 flex flex-col w-full max-w-md">
              <h2 className="text-2xl font-semibold text-white mb-6">Edit Blog Post</h2>
              <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Blog Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Blog Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-2 rounded-md bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Author Name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end gap-2">
                  <button type="submit" className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                    Update Blog Post
                  </button>
                  <button onClick={() => setEditModal(false)} className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors">
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
