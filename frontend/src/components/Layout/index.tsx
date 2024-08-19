import React, { useEffect } from 'react'
import Header from './Header'
import { useLocation } from 'react-router-dom'
import UsernameDialog from '../UsernameDialog'
import useSessionStorage from '@/utils/useSessionStorage'
import { useAppContext } from '@/context/appContext'

const Layout = ({ children }: {children: React.ReactNode}) => {
 // check if pathname is / or /room
 const location = useLocation()
 const isHome = location.pathname === '/'
 const { username, setUsername } = useAppContext()
 const [usernameDialogOpen, setUsernameDialogOpen] = React.useState(false)
 const userHasUsername = username !== '' && username !== null && username !== undefined

 useEffect(() => {
    if (!userHasUsername) {
      console.log(!userHasUsername)
      setUsernameDialogOpen(true)
    } else {
      setUsernameDialogOpen(false)
    }
  }, [username, userHasUsername, setUsername])

  return (
    <div>
      <Header />
      <main className={`flex-wrap min-h-screen flex-1 p-0 flex flex-row ${isHome ? 'max-md:flex-col' : 'flex-col' } items-center justify-center gap-8`}>
        {children}
        <UsernameDialog open={usernameDialogOpen} onUsernameSubmit={setUsername} />
      </main>
    </div>
  )
}

export default Layout