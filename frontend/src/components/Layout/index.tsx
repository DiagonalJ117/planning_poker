import React from 'react'
import Header from './Header'
import { useLocation } from 'react-router-dom'

const Layout = ({ children }: {children: React.ReactNode}) => {
 // check if pathname is / or /room
 const location = useLocation()
 const isHome = location.pathname === '/'
  return (
    <div>
      <Header />
      <main className={`flex-wrap min-h-screen flex-1 p-0 flex flex-row ${isHome ? 'max-md:flex-col' : 'flex-col' } items-center justify-center gap-8`}>
        {children}
      </main>
    </div>
  )
}

export default Layout