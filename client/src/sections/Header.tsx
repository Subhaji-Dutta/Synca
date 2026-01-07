"use client"
import { MoveRight, MenuIcon, X } from 'lucide-react'
import { SignedIn, SignedOut, SignUpButton, UserButton } from '@clerk/clerk-react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const Header = () => {
  const user = useUser()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <header className='sticky top-0 backdrop-blur-sm z-20'>
    <div className='flex justify-center items-center py-3 bg-black text-white text-sm gap-3'>
      <p className='text-white/60 hidden md:block'>Streamline your workflow and boost your productivity</p>
      <SignedOut>
      <div className='inline-flex gap-1 items-center'>
      <p>Get Started for Free </p>
      <MoveRight className='ml-2 h-5 w-5 inline-flex justify-center items-center'/>
    </div>
    </SignedOut>
    <SignedIn>
    <div className='inline-flex gap-1 items-center'>
      <p>Hi {user?.user?.firstName || 'User'}, Be productive!</p>
      <MoveRight className='ml-2 h-5 w-5 inline-flex justify-center items-center'/>
    </div>
    </SignedIn>
    </div>
    <div className='p-5 md:px-12'>
      <div className='flex items-center justify-between'>
      <img src="/assets/logosaas.png" alt="Saas logo" width={60} height={60} />
      <button 
        className='md:hidden p-2' 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className='h-8 w-8' /> : <MenuIcon className='h-8 w-8' />}
      </button>
      <nav className='hidden md:flex gap-8 text-black/60 items-center font-medium text-lg'>
        <a href='#'>Home</a>
        <a href='#'>Pricing</a>
        <a href='#'>About</a>
        <a href='#'>Contact</a>
        <SignedOut>
        <SignUpButton mode='modal'>
        <button className='bg-blue-950 text-white px-4 py-2 rounded-lg inline-flex font-medium items-center tracking-tight justify-center cursor-pointer'>
          Get Started
        </button>
        </SignUpButton>
        </SignedOut>
        <SignedIn>
          <button onClick={() => navigate('/dashboard')} className='bg-black text-white px-4 py-2 rounded-xl cursor-pointer'>
          Dashboard
        </button>
        </SignedIn>
      </nav>
      </div>
      
    </div>
    
    {/* Mobile Menu Overlay */}
    <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out z-30 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
      <nav className='flex flex-col gap-6 text-black/60 items-center font-medium text-lg py-8'>
        <a href='#' onClick={() => setIsMenuOpen(false)}>Home</a>
        <a href='#' onClick={() => setIsMenuOpen(false)}>Pricing</a>
        <a href='#' onClick={() => setIsMenuOpen(false)}>About</a>
        <a href='#' onClick={() => setIsMenuOpen(false)}>Contact</a>
        <SignedOut>
        <SignUpButton mode='modal'>
        <button 
          className='bg-black text-white px-6 py-3 rounded-lg inline-flex font-medium items-center tracking-tight justify-center cursor-pointer w-full max-w-xs'
          onClick={() => setIsMenuOpen(false)}
        >
          Get Started
        </button>
        </SignUpButton>
        </SignedOut>
        <SignedIn>
          <button 
            onClick={() => {
              navigate('/dashboard')
              setIsMenuOpen(false)
            }} 
            className='bg-black text-white px-6 py-3 rounded-xl cursor-pointer w-full max-w-xs'
          >
          Dashboard
        </button>
        </SignedIn>
      </nav>
    </div>
    </header>
  )
};
