import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import roomRoutes from './routes/room.routes';

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
  
    socket.on('joinRoom', (room) => {
      socket.join(room);
      console.log(`user joined room ${room}`);
    });
  
    socket.on('vote', (message) => {
      console.log(message);
      io.emit('message', message);
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
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



