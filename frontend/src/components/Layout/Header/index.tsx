import { Link, useLocation } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { useAppContext } from '@/context/appContext'
import ThemeToggle from '@/components/ThemeToggle'

const Header = () => {
  const location = useLocation()
  const { username, setUsername } = useAppContext();
  const hasJoinedRoom = /^\/room\/[a-zA-Z0-9]+$/.test(location.pathname)
  const handleUsernameChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  return (
    <header className="bg-primary text-primary-foreground dark:bg-secondary dark:text-secondary-foreground py-4 px-6 flex items-center justify-between">
      <Link to='/'><h1 className="text-2xl font-bold">Scrum Poker</h1></Link>
      <Input placeholder='Username' value={username} onChange={handleUsernameChange} disabled={hasJoinedRoom} className='w-1/4' />
      <ThemeToggle />
    </header>
  )
}

export default Header