import React from 'react'
import { Button } from '@/components/ui/button'
import { SettingsIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
      <Link to='/'><h1 className="text-2xl font-bold">Scrum Poker</h1></Link>
      <Link to='/settings'>
        <Button variant="secondary" size="sm">
          <SettingsIcon className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </Link>
    </header>
  )
}

export default Header