import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Backend_Url } from '../utils';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${Backend_Url}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await response.json();
    if (data.message) {
      toast.success(data.message);
    } else {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-[#111]'>
      <h1 className='text-5xl font-bold text-white mb-8'>Sign Up</h1>
      <ToastContainer position='top-right' autoClose={3000} />
      <form
        className='flex flex-col items-center justify-center gap-4 bg-[#222] p-8 rounded-lg shadow-md w-80'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='p-3 w-full rounded-md outline-none focus:ring-2 focus:ring-purple-500 text-black'
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='p-3 w-full rounded-md outline-none focus:ring-2 focus:ring-purple-500 text-black'
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='p-3 w-full rounded-md outline-none focus:ring-2 focus:ring-purple-500 text-black'
        />
        <button
          type='submit'
          className='w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all duration-300'
        >
          Sign Up
        </button>
        <Link
          to='/'
          className='mt-4 text-purple-400 hover:text-purple-500 transition-all'
        >
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
};

export default SignupPage;
