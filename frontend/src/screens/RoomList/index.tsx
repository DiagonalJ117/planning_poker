import { Button } from '@/components/ui/button'
import React from 'react'

const RoomList = () => {

  const RoomListItem = ({ name, participants }: { name: string, participants: number }) => {
    return (
      <div className="bg-card rounded-lg p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">{name}</h2>
          <p className="text-muted-foreground">{participants} participants</p>
        </div>
        <Button variant="outline">Join</Button>
      </div>
    )
  }

  const roomList = [
    {
      id: 1,
      name: 'Design Team',
      participants: 8
    },
    {
      id: 2,
      name: 'Engineering Backlog',
      participants: 15
    },
    {
      id: 3,
      name: 'Product Roadmap',
      participants: 9
    },
    {
      id: 4,
      name: 'Marketing Brainstorm',
      participants: 11
    },
    {
      id: 5,
      name: 'Sales Forecast',
      participants: 6
    },
    {
      id: 6,
      name: 'Customer Support',
      participants: 3
    },
    {
      id: 7,
      name: 'Finance Planning',
      participants: 4
    },
    {
      id: 8,
      name: 'HR Initiatives',
      participants: 7
    },
    {
      id: 9,
      name: 'Legal Compliance',
      participants: 2
    },
    {
      id: 10,
      name: 'Operations Review',
      participants: 5
    }
  ]

  return (
    <div className="bg-background w-full text-foreground min-h-screen flex flex-col">
    <div className="flex-1 overflow-auto p-6">
      <div className="grid gap-4">
        {roomList.map(room => (
          <RoomListItem key={room.name} name={room.name} participants={room.participants} />)
        )}
      </div>
    </div>
  </div>
  )
}

export default RoomList