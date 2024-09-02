import { createRoom } from '@/api/services/roomService'
import RoomSettingsPanel from '@/components/RoomSettingsPanel'
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
      <RoomSettingsPanel />
    </div>
  )
}

export default CreateRoom