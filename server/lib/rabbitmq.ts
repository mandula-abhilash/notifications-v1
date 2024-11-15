import amqp from 'amqplib';

let channel: amqp.Channel | null = null;

export async function setupRabbitMQ() {
  try {
    const connection = await amqp.connect(
      process.env.RABBITMQ_URL || 'amqp://localhost'
    );
    channel = await connection.createChannel();
    
    // Setup queues
    await channel.assertQueue('notifications', { durable: true });
    await channel.assertExchange('notification_exchange', 'fanout', { durable: true });
    await channel.bindQueue('notifications', 'notification_exchange', '');
    
    console.log('RabbitMQ connected');
    return channel;
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
    throw error;
  }
}

export function getChannel() {
  if (!channel) throw new Error('RabbitMQ not initialized');
  return channel;
}