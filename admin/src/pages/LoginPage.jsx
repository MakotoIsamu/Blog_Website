import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-[#111]'>
      <h1 className='text-5xl font-bold text-white mb-8'>Login</h1>
      <form
        className='flex flex-col items-center justify-center gap-4 bg-[#222] p-8 rounded-lg shadow-md w-80'
        onSubmit={handleSubmit}
      >
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
          Login
        </button>
        <Link
          to='/signup'
          className='mt-4 text-purple-400 hover:text-purple-500 transition-all'
        >
          Don't have an account? Signup
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
