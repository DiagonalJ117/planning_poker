import React from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useParams } from 'react-router-dom'

type VoteButtonProps = {
  children: string;
}

type UserVoteComponentProps = {
  name: string;
  vote: string;
}

const userVotes = [
  { name: 'John Doe', vote: '5' },
  { name: 'Jane Smith', vote: '8' },
  { name: 'Bob Johnson', vote: '3' }
]

const voteOptions = ['1', '2', '3', '5', '8', '13', '21']



const Room = () => {
  const [showVotes, setShowVotes] = React.useState(false)
  const [vote, setVote] = React.useState('')
  const { id } = useParams();

  const handleRevealVotes = () => {
    setShowVotes(!showVotes)
  }

  const handleVote = (children: string) => {
    setVote(children)
  }


  const VoteButton = ({ children }: VoteButtonProps) => (
    <Button onClick={() => handleVote(children)} variant="ghost" className="w-12 h-12 rounded-full text-2xl font-bold">
      {children}
    </Button>
  )

  const UserVoteComponent = ({ name, vote }: UserVoteComponentProps) => (
    <div className="flex flex-col items-center">
      <Avatar className="w-12 h-12 border">
        <AvatarImage src="/placeholder-user.jpg" alt={name} />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <div className="text-sm font-medium mt-2">{name}</div>
      <div className="text-2xl font-bold text-primary">{showVotes ? vote : '-'}</div>
    </div>
  )

  return (
    <>
        <h1 className="mt = text-2xl font-bold mb-4">Room {id}</h1>
        <h2>{vote}</h2>
        <div className="grid grid-cols-7 gap-4">

          {
            voteOptions.map(option => (
              <VoteButton key={option}>{option}</VoteButton>
            ))
          }
        </div>
        <Button onClick={handleRevealVotes} className="px-6 py-3 rounded-md text-lg font-medium">Reveal Votes</Button>
        <div className="bg-card p-6 rounded-md w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">Votes</h2>
          <div className="grid grid-cols-3 gap-4">
            {
              userVotes.map(({ name, vote }) => (
                <UserVoteComponent key={name} name={name} vote={vote} />
              ))
            }
          </div>
        </div>
        </>
  )
}

export default Room