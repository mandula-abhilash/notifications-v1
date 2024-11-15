import { Server, Socket } from 'socket.io';
import { getChannel } from './lib/rabbitmq';

export const setupSocketHandlers = (io: Server) => {
  const channel = getChannel();

  // Consume messages from RabbitMQ and broadcast to connected clients
  channel.consume('notifications', (msg) => {
    if (msg) {
      const notification = JSON.parse(msg.content.toString());
      io.to(`user:${notification.userId}`).emit('notification', notification);
      channel.ack(msg);
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id);

    socket.on('subscribe', (userId: string) => {
      socket.join(`user:${userId}`);
      console.log(`User ${userId} subscribed to notifications`);
    });

    socket.on('unsubscribe', (userId: string) => {
      socket.leave(`user:${userId}`);
      console.log(`User ${userId} unsubscribed from notifications`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};