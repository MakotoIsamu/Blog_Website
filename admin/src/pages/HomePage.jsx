import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-[#111]'>
        <h1 className='text-6xl font-afacad p-6 text-white'>This is an Admin HomePage</h1>
        <div className='w=full gap-4 flex flex-wrap justify-center items-center p-6'>
          <Link to='/blogs' className='p-4 bg-gray-100 rounded-md text-center cursor-pointer hover:bg-[#222] hover:text-white transition-all duration-300'>
            <h2 className='text-2xl font-afacad'>Blogs</h2>
          </Link>
          <Link to='/categories' className='p-4 bg-gray-100 rounded-md text-center cursor-pointer hover:bg-[#222] hover:text-white transition-all duration-300'>
            <h2 className='text-2xl font-afacad'>Category</h2>
          </Link>
          <Link to='/users' className='p-4 bg-gray-100 rounded-md text-center cursor-pointer hover:bg-[#222] hover:text-white transition-all duration-300'>
            <h2 className='text-2xl font-afacad'>Users</h2>
          </Link>
        </div>
    </div>
  )
}

export default HomePage