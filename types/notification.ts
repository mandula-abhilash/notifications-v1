export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'error' | 'success';
}

export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  features: string[];
  current: boolean;
}