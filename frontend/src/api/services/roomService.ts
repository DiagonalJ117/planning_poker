import { CreateRoomInput } from "@/types"
import doRequest from "../APIBase"

const getRoomList = async () => {
  try {
    const response = await doRequest({
      method: 'GET',
      url: 'api/room/list',
    })
    return response
  } catch (error) {
    console.error(error)
    throw error;
  }
}

const getRoom = async (id?: string | null, name?: string) => {
  try {
    const response = await doRequest({
      method: 'GET',
      url: `api/room/${id || name}`,
    })
    return response
  } catch (error) {
    console.error(error)
    throw error;
  }
}

const getRoomByName = async (name: string) => {
  try {
    const response = await doRequest({
      method: 'GET',
      url: `api/room/getByName/${name}`,
    })
    return response
  }
  catch (error) {
    console.error(error)
    throw error;
  }
}

const createRoom = async (data: CreateRoomInput) => {

  const { roomName, votingSystem, isPrivate, password} = data;

  // Check if room with name already exists

  try {
    const doesRoomExist = await getRoomByName(roomName)
    if (doesRoomExist) {
      throw new Error('Room already exists')
    }
    const response = await doRequest({
      method: 'POST',
      url: 'api/room/create',
      data: { name: roomName, votingSystem, isPrivate, password },
    })
    return response
  } catch (error) {
    console.error(error)
    throw error;
  }
}

const updateRoom = async (id: string, name: string) => {
  try {
    const response = await doRequest({
      method: 'PUT',
      url: `api/room/${id}`,
      data: { name },
    })
    return response
  } catch (error) {
    console.error(error)
    throw error;
  }
}

const deleteRoom = async (id: string) => {
  try {
    const response = await doRequest({
      method: 'DELETE',
      url: `api/room/${id}`,
    })
    return response
  } catch (error) {
    console.error(error)
    throw error;
  }
}

export {
  getRoomList, getRoom, createRoom, updateRoom, deleteRoom
}