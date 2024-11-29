import https from 'https';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import userRoutes from './routes/userRoutes';

const app = express();
const port = 3001;

// Middleware
app.use(cors({
  origin: 'https://localhost', // Ensure this matches your frontend URL
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// HTTPS Setup
const httpsOptions = {
  key: fs.readFileSync('/app/certs/localhost.key'),
  cert: fs.readFileSync('/app/certs/localhost.crt'),
};
const server = https.createServer(httpsOptions, app);

// Socket.IO Setup
const io = new Server(server, {
  path: '/socket.io/', // Explicitly set the path (default)
  cors: {
    origin: 'https://localhost', // Match your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle incoming messages
  socket.on('chatMessage', (message) => {
    console.log('Message received:', message);
    // Broadcast message to all connected clients
    io.emit('chatMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start server
server.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
