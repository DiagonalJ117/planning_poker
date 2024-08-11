import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const JoinRoom = () => {
  return (
    <div className='flex flex-col h-52 content-evenly'>
      <Input placeholder='Room Name' className='my-3' />
      <Button>Join Room</Button>
    </div>
  )
}

export default JoinRoom