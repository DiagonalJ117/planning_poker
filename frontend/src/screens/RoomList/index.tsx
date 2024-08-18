import { getRoomList } from '@/api/services/roomService'
import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RoomList = () => {

  const navigate = useNavigate()
  const [rooms, setRooms] = React.useState([])

  const RoomListItem = ({ name, participants, handleJoinRoom }: { name: string, participants: number, handleJoinRoom: () => void }) => {
    return (
      <div className="bg-card rounded-lg p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">{name}</h2>
          <p className="text-muted-foreground">{participants} participants</p>
        </div>
        <Button onClick={handleJoinRoom} variant="outline">Join</Button>
      </div>
    )
  }

  const handleJoinRoom = (roomId: string) => {
    console.log('Joining room', roomId)
    navigate(`/room/${roomId}`)
  }

  const fetchRoomList = async () => {
    try {
      const response = await getRoomList()
      setRooms(response)
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    fetchRoomList()
  }, [])


  return (
    <div className="bg-background w-full text-foreground min-h-screen flex flex-col">
    <div className="flex-1 overflow-auto p-6">
      <div className="grid gap-4">
        {rooms?.map(room => (
          <RoomListItem key={room.name} name={room.name} participants={0} handleJoinRoom={() => handleJoinRoom(room.id)} />)
        )}
      </div>
    </div>
  </div>
  )
}

export default RoomList