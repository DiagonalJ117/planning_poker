import { Link, useLocation } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import useSessionStorage from '@/utils/useSessionStorage'
import { useAppContext } from '@/context/appContext'

const Header = () => {
  const location = useLocation()
  const { username, setUsername } = useAppContext();
  const hasJoinedRoom = /^\/room\/[a-zA-Z0-9]+$/.test(location.pathname)
  const handleUsernameChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
      <Link to='/'><h1 className="text-2xl font-bold">Scrum Poker</h1></Link>
      <Input placeholder='Username' value={username} onChange={handleUsernameChange} disabled={hasJoinedRoom} className='w-1/4 bg-transparent' />
    </header>
  )
}

export default Header