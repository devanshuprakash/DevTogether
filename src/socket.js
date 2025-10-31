import { io } from 'socket.io-client';

export function initSocket() {
  const options = {
    forceNew: true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ['websocket'],
  };
  const url = import.meta?.env?.VITE_BACKEND_URL || 'http://localhost:4000';
  return io(url, options);
}
