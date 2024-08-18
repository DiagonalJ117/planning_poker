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

const getRoom = async (id: string) => {
  try {
    const response = await doRequest({
      method: 'GET',
      url: `api/room/${id}`,
    })
    return response
  } catch (error) {
    console.error(error)
    throw error;
  }
}

const createRoom = async (name: string) => {
  try {
    const response = await doRequest({
      method: 'POST',
      url: 'api/room/create',
      data: { name: name },
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