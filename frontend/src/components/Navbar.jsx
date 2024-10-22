import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4 bg-[#111111]'>
        <h1 className='text-2xl font-bold text-white'>Blog Website</h1>
        <div className='flex gap-4'>
            <Link to='/' className='text-white'>Home</Link>
            <Link to='/blog' className='text-white'>Blog</Link>
        </div>
    </div>
  )
}

export default Navbar