"use client";

import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io('http://localhost:4000', {
      autoConnect: false,
      reconnection: true,
    });
  }
  return socket;
};

export const connectSocket = (userId: string) => {
  const socket = getSocket();
  if (!socket.connected) {
    socket.connect();
    socket.emit('subscribe', userId);
  }
};

export const disconnectSocket = (userId: string) => {
  const socket = getSocket();
  if (socket.connected) {
    socket.emit('unsubscribe', userId);
    socket.disconnect();
  }
};