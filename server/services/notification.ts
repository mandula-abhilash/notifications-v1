import Redis from 'ioredis';
import { getChannel } from '../lib/rabbitmq';
import redis from '../lib/redis';

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export class NotificationService {
  private readonly redis: Redis;

  constructor() {
    this.redis = redis;
  }

  private getKey(userId: string) {
    return `notifications:${userId}`;
  }

  async getAllForUser(userId?: string): Promise<Notification[]> {
    if (!userId) return [];
    
    const notifications = await this.redis.lrange(this.getKey(userId), 0, -1);
    return notifications.map(n => JSON.parse(n));
  }

  async create(data: Partial<Notification>) {
    const notification: Notification = {
      id: Date.now().toString(),
      userId: data.userId!,
      title: data.title!,
      message: data.message!,
      timestamp: new Date().toISOString(),
      read: false
    };

    // Store in Redis
    await this.redis.lpush(
      this.getKey(notification.userId),
      JSON.stringify(notification)
    );

    // Publish to RabbitMQ for cross-server communication
    const channel = getChannel();
    await channel.publish(
      'notification_exchange',
      '',
      Buffer.from(JSON.stringify(notification)),
      { persistent: true }
    );

    return notification;
  }

  async markAsRead(id: string, userId: string) {
    const key = this.getKey(userId);
    const notifications = await this.getAllForUser(userId);
    const index = notifications.findIndex(n => n.id === id);
    
    if (index !== -1) {
      notifications[index].read = true;
      await this.redis.lset(key, index, JSON.stringify(notifications[index]));
      return notifications[index];
    }
    return null;
  }

  async delete(id: string, userId: string) {
    const key = this.getKey(userId);
    const notifications = await this.getAllForUser(userId);
    const filtered = notifications.filter(n => n.id !== id);
    
    // Clear and rewrite the list
    await this.redis.del(key);
    if (filtered.length > 0) {
      await this.redis.lpush(
        key,
        ...filtered.map(n => JSON.stringify(n))
      );
    }
  }
}