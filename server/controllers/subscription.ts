import { Request, Response } from 'express';
import { SubscriptionService } from '../services/subscription';

const service = new SubscriptionService();

export class SubscriptionController {
  async getStatus(req: Request, res: Response) {
    try {
      const status = await service.getStatus(req.user?.id);
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching subscription status' });
    }
  }

  async upgrade(req: Request, res: Response) {
    try {
      const result = await service.upgrade(req.user?.id, req.body.plan);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error upgrading subscription' });
    }
  }

  async downgrade(req: Request, res: Response) {
    try {
      const result = await service.downgrade(req.user?.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error downgrading subscription' });
    }
  }
}