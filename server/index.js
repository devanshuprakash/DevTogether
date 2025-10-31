import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();

app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST'],
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
  },
});

// In-memory room state
const roomState = new Map();

function getRoomState(roomId) {
  if (!roomState.has(roomId)) {
    roomState.set(roomId, { code: '' });
  }
  return roomState.get(roomId);
}

io.on('connection', (socket) => {
  socket.on('join', ({ roomId, username }) => {
    socket.join(roomId);
    socket.data.username = username;
    socket.data.roomId = roomId;

    socket.to(roomId).emit('joined', {
      socketId: socket.id,
      username,
    });

    const { code } = getRoomState(roomId);
    socket.emit('sync_code', code);
  });

  socket.on('code_change', ({ roomId, code }) => {
    const state = getRoomState(roomId);
    state.code = code;
    socket.to(roomId).emit('code_change', { code });
  });

  socket.on('request_sync', ({ roomId }) => {
    const { code } = getRoomState(roomId);
    socket.emit('sync_code', code);
  });

  socket.on('disconnect', () => {
    const roomId = socket.data.roomId;
    const username = socket.data.username;
    if (roomId) {
      socket.to(roomId).emit('disconnected', {
        socketId: socket.id,
        username,
      });
    }
  });
});

app.get('/', (_req, res) => {
  res.send('DevTogether backend is running');
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});