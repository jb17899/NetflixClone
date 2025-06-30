import React from 'react'
import { Link } from 'react-router-dom';
import { Search,LogOut, Menu } from 'lucide-react';
import { useAuthStore } from '../../store/authUser';
import { useContentStore } from '../../store/content';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const toggleMobileMenu = ()=>{
    setMobileMenuOpen(!isMobileMenuOpen);
  }
  const {user,logout} = useAuthStore();
    const {contentType,setContentType} = useContentStore();
  return (
    <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 text-white'>
      <div className='flex items-center gap-10 z-50 border-b-2pb-2'>
        <Link to="/">
        <img src="/netflix-logo.png" alt="Logo" className='w-32 sm:w-40' />
        </Link>
        <div className='hidden sm:flex gap-10 items-center'>
          <Link to="/" className='text-lg font-semibold hover:text-gray-300 hover:underline' onClick={()=>{setContentType("movie")}}>Movies</Link>
          <Link to="/" className='text-lg font-semibold hover:text-gray-300 hover:underline' onClick={()=>{setContentType("tv")}}>Tv Shows</Link>
          <Link to="/history" className='text-lg font-semibold hover:text-gray-300 hover:underline'>History</Link>
        </div>
      </div>
      <div className='flex items-center z-50'>
        <Link to={"/search"}>
        <Search className='size-6 cursor-pointer mr-4 hover:text-gray-300' />
        </Link>
        <img src="/avatar1.png" alt="User Avatar" className='w-10 h-10 rounded-full cursor-pointer mr-4' />
        <LogOut className="size-6 cursor-pointer" onClick={logout}></LogOut>
        <div className='sm:hidden'>
          <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className='absolute top-16 left-0 w-full bg-gray-800 text-white p-4 flex flex-col gap-4'>
          <Link to="/" className='text-lg font-semibold hover:text-gray-300 hover:underline'>Movies</Link>
          <Link to="/" className='text-lg font-semibold hover:text-gray-300 hover:underline'>Tv Shows</Link>
          <Link to="/history" className='text-lg font-semibold hover:text-gray-300 hover:underline'>History</Link>
        </div>
      )
        }

    </header>
  )
}

export default Navbar
