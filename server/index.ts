import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { authMiddleware } from './middleware/auth';
import { notificationRoutes } from './routes/notifications';
import { subscriptionRoutes } from './routes/subscriptions';
import { setupSocketHandlers } from './socket';
import { setupRabbitMQ } from './lib/rabbitmq';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

async function startServer() {
  try {
    // Initialize RabbitMQ
    await setupRabbitMQ();

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(authMiddleware);

    // Routes
    app.use('/api/notifications', notificationRoutes);
    app.use('/api/subscriptions', subscriptionRoutes);

    // Socket.IO setup
    setupSocketHandlers(io);

    const PORT = process.env.PORT || 4000;

    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();