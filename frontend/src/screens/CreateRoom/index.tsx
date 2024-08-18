import { createRoom } from '@/api/services/roomService'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { CheckedState } from '@radix-ui/react-checkbox'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreateRoom = () => {
  const [isPrivate, setIsPrivate] = React.useState(false)
  const [roomName, setRoomName] = React.useState('')
  const navigate = useNavigate();

  const handleIsPrivateChange = (checked: CheckedState) => {
    setIsPrivate(checked === "indeterminate" ? false : checked)
  }

  const handleRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value)
  }

  const handleCreateRoom = async () => {
    // Create room
    try {
      const response = await createRoom(roomName)
      navigate(`/room/${response.id}`)
      return response
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex flex-col h-52 justify-between'>
      <Input placeholder='Room Name' onChange={handleRoomNameChange}/>
      <div className='flex flex-row items-center'>
        <label htmlFor='isPrivate' className='mr-2'>Private</label>
        <Checkbox checked={isPrivate} onCheckedChange={handleIsPrivateChange} id='isPrivate' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70' />
      </div>
      {isPrivate && <Input type='password' placeholder='Password' />}

      <Button onClick={handleCreateRoom}>Create Room</Button>
    </div>
  )
}

export default CreateRoom