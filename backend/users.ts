interface IUser {
  id: string;
  name: string;
  room: string;
}

const users: IUser[] = []

const addUser = ({id, name, room} : IUser) => {
  const existingUser = users?.find(user => user.name.trim().toLowerCase() === name.trim().toLowerCase())

  const existingIdUserIndex = users.findIndex(user => user.id === id);
  if (existingIdUserIndex !== -1) {
    users.splice(existingIdUserIndex, 1); // Remove the user with the duplicate ID
  }
  // if (existingUser) return { error: "Username has already been taken" }
  if (!name && !room) return { error: "Username and room are required" }
  if (!name) return { error: "Username is required" }
  if (!room) return { error: "Room is required" }

  const user = { id, name, room }
  users.push(user)
  return { user }
}

const getUser = (id: string) => users?.find(user => user.id === id)

const deleteUser = (id: string) => {
  const index = users.findIndex(user => user.id === id)
  if (index !== -1) return users.splice(index, 1)[0]
}

const getUsersInRoom = (room: string) => users.filter(user => user.room === room)

export { addUser, getUser, deleteUser, getUsersInRoom }