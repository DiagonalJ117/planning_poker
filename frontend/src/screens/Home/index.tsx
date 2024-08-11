import { LinkIcon, ListIcon, PlusIcon, SettingsIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <span className='flex flex-row max-md:flex-col max-md:w-full items-center'>
      <Link
        to="/create-room"
        className="flex flex-col max-md:w-full items-center justify-center gap-2 p-6 bg-card rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <PlusIcon className="w-8 h-8" />
        <span className="text-sm font-medium">Create Room</span>
      </Link>
      <Link
        to="/join-room"
        className="flex flex-col max-md:w-full items-center justify-center gap-2 p-6 bg-card rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <LinkIcon className="w-8 h-8" />
        <span className="text-sm font-medium">Join Room</span>
      </Link>
      <Link
        to="/room-list"
        className="flex flex-col max-md:w-full items-center justify-center gap-2 p-6 bg-card rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <ListIcon className="w-8 h-8" />
        <span className="text-sm font-medium">Room List</span>
      </Link>
      <Link
        to="/settings"
        className="flex flex-col max-md:w-full items-center justify-center gap-2 p-6 bg-card rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <SettingsIcon className="w-8 h-8" />
        <span className="text-sm font-medium">Settings</span>
      </Link>
      </span>
  )
}

export default Home