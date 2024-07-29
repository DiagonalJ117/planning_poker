import React from 'react'
import { Link } from 'react-router-dom'
import { Input } from '../ui/input'

const Header = () => {
  return (
    <header className='sticky top-0 z-40 w-full bg-background shadow-sm'>
    <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link to='/' className="text-lg font-semibold">
            Home
          </Link>
          <Link to="/roomlist" className="text-lg font-semibold">
            Room List
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-sm">
            <Input type="text" placeholder="Enter your username" className="pr-12" />
          </div>
        </div>
        </div>
    </header>
  )
}

export default Header