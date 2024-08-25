import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useNavigate, useParams } from 'react-router-dom'
import { socket } from '@/socket'
import useSessionStorage from '@/utils/useSessionStorage'
import { getRoom } from '@/api/services/roomService'
import {  UserVoteComponentProps, VoteButtonProps } from '@/types'
import TabularVoteSummary from '@/components/VoteSummary/TabularVoteSummary'


const voteOptions = ['1', '2', '3', '5', '8', '13', '21']



const Room = () => {
  const [username, _] = useSessionStorage('username', '')
  const [showVotes, setShowVotes] = React.useState(false)
  const [estimates, setEstimates] = React.useState<UserVoteComponentProps[]>([])
  const [roomName, setRoomName] = React.useState('')
  const [users, setUsers] = React.useState<UserVoteComponentProps[]>([])
  const [currentUser, setCurrentUser] = React.useState(username || null)
  const [vote, setVote] = React.useState('')
  const { id } = useParams();
  const navigate = useNavigate()

  const setInitialUserEstimatesInRoom = (users: UserVoteComponentProps[]) => {
    // check for existing users in estimates

    const newUserEstimates = users.map(user => {
      
      // check if user has already voted
      const userWithVote = estimates.find(est => est.name === user.name && est.vote !== '-')

      if (!userWithVote) {
        return { name: user.name, vote: user.vote }
      }
      return userWithVote
    })

    users.forEach((user: UserVoteComponentProps) => {
      console.log('setting user estimate', { name: user.name, vote: '-' })
      setEstimates(newUserEstimates)
    })
  }

  const getRoomData = async () => {
    try {
      const response = await getRoom(id || '')
      const data = await response
      console.log(data)
      setRoomName(data.name)
    } catch (error) {
      console.error(error)
    }
  }



  const checkUserLoginToRoom = () => {
    socket.emit('joinRoom', { userName: currentUser, roomId: id, roomName: roomName }, error => {
      if (error) {
        console.error(error)
        navigate(-1)
        return false
      }
    })

    return true;
  }

  useEffect(() => {

    // check if user has username
    if(username) {
      socket.connect();
      getRoomData().then(() => { 
        checkUserLoginToRoom()
      }).catch((error) => {
        console.error(error)
      })


      if(!currentUser) {
        setCurrentUser(username)
      }

      socket.on('usersInRoom', (users: UserVoteComponentProps[]) => {
        console.log('users in room', users)
        if(users) {
          setUsers(users)
          console.log('setting initial estimates')
          if(users.length <= 1 ) {
            setInitialUserEstimatesInRoom(users as UserVoteComponentProps[])
          }
        }
      })

    } else {
      navigate('/')
    }

    socket.on('connect', () => {
      console.log('connected')
    })

    return () => {
      socket.disconnect()
      socket.on('disconnect', () => {
        const estimatesWithRemovedUser = estimates.filter(est => est.name !== currentUser)
        setEstimates(estimatesWithRemovedUser)
        console.log('disconnected')
      })
    }
    
  }, [])

  useEffect(() => {
    socket.on('estimate', (vote: any) => {
      console.log('estimate', vote)
      setEstimates(prevEstimates => {
        const updatedEstimates = prevEstimates.map(est => {
          if (est.name === vote.user) {
            return { ...est, vote: vote.vote };
          }
          return est;
        });
        const existingUser = updatedEstimates.find(est => est.name === vote.user);
        if (!existingUser) {
          return [...updatedEstimates, { name: vote.user, vote: vote.vote }];
        }
        return updatedEstimates;
      });
      console.log('estimates', estimates)
    })

    socket.on('revealVotes', ({ areVotesRevealed}) => {
      setShowVotes(areVotesRevealed ? false : true)
    })

    socket.on('usersInRoom', (users: UserVoteComponentProps[]) => {
      setInitialUserEstimatesInRoom(users)
    })
  }, [socket])

  const handleRevealVotes = () => {
    socket.emit('revealVotes', { roomId: id, areVotesRevealed: showVotes })
  }

  const handleVote = (children: string) => {
    setVote(children)
    socket.emit('vote', {user: currentUser, vote: children})
    console.log('estimates', estimates) 
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
        <h1 className="mt = text-2xl font-bold mb-4">Room {roomName}</h1>
        {showVotes &&  <TabularVoteSummary votes={estimates} />}

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
              estimates?.map(({ name, vote }) => (
                <UserVoteComponent key={name} name={name} vote={vote} />
              ))
            }
          </div>
        </div>
        </>
  )
}

export default Room