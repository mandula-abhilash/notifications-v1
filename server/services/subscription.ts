import redis from '../lib/redis';

interface Subscription {
  userId: string;
  plan: string;
  validUntil: string | null;
}

export class SubscriptionService {
  private readonly redis;

  constructor() {
    this.redis = redis;
  }

  private getKey(userId: string) {
    return `subscription:${userId}`;
  }

  async getStatus(userId?: string) {
    if (!userId) return null;
    
    const data = await this.redis.get(this.getKey(userId));
    if (!data) {
      return {
        plan: 'free',
        validUntil: null
      };
    }
    
    return JSON.parse(data);
  }

  async upgrade(userId?: string, plan?: string) {
    if (!userId || !plan) return null;
    
    const subscription: Subscription = {
      userId,
      plan,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    await this.redis.set(
      this.getKey(userId),
      JSON.stringify(subscription)
    );
    
    return subscription;
  }

  async downgrade(userId?: string) {
    if (!userId) return null;
    
    const subscription: Subscription = {
      userId,
      plan: 'free',
      validUntil: null
    };
    
    await this.redis.set(
      this.getKey(userId),
      JSON.stringify(subscription)
    );
    
    return subscription;
  }
}