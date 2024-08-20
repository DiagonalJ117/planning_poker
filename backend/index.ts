import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import roomRoutes from './routes/room.routes';
import { addUser, deleteUser, getUser, getUsersInRoom, updateUserVote } from './users';

const app = express();
const PORT = 4000;
const SOCKET_SERVER_PORT = 3000;

export const prisma = new PrismaClient();

async function main() {

  const server = http.createServer(app);

  app.use(cors());
  app.use(express.json());
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  // Root route
  app.get('/api', (req, res) => {
    res.json({ message: 'Hello World!' });
  });

  // Routes
  app.use('/api/room', roomRoutes);

  app.all('*', (req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} Not Found` });
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  
  io.on('connection', (socket) => {
    console.log('new user connected with id:', socket.id);
  
    socket.on('joinRoom', ({ userName, roomId, roomName }, callback) => {
      socket.join(roomId);
      const { user, error } = addUser({ id: socket.id, name: userName, room: roomId });
      if (error) {
        console.log(error);
        return callback(error);
      }
      socket.in(roomId).emit('notification', `${user?.name} joined the room`);
      io.in(roomId).emit('usersInRoom', getUsersInRoom(roomId));
      console.log('users in room', getUsersInRoom(roomId));
      console.log(`user ${user?.name} joined room ${user?.room}. Id: ${roomId}`);
    });
  
    socket.on('vote', (message) => {
      const user = getUser(socket.id);
      console.log(message);
      if(user) {
        updateUserVote(socket.id, message.vote);
        io.in(user?.room).emit('estimate', { user: user?.name, vote: message.vote });
      }

    });

    socket.on('revealVotes', ({roomId, areVotesRevealed}) => {
      io.in(roomId).emit('revealVotes',{ areVotesRevealed: areVotesRevealed ? true : false});
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
      const user = deleteUser(socket.id);
      if (user) {
        io.in(user.room).emit('notification', `${user.name} left the room`);
        io.in(user.room).emit('usersInRoom', getUsersInRoom(user.room));
        console.log(`user ${user.name} left room ${user.room}`);
      }
    });
  });
  
  server.listen(SOCKET_SERVER_PORT, () => {
    console.log(`Socket server is running on http://localhost:${SOCKET_SERVER_PORT}`);
  });
}


main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });



