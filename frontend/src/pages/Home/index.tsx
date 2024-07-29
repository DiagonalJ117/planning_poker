import { Button } from '@/components/ui/button'
import { Plus, LogIn } from 'lucide-react'
import React from 'react'

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Button className="m-3"><Plus className='mr-2 h-4 w-4'/>Create</Button>
      <Button className="m-3"><LogIn className='mr-2 h-4 w-4'/>Join</Button>
    </div>
  )
}

export default Home