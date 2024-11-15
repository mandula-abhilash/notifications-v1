import { Request, Response } from 'express';
import { NotificationService } from '../services/notification';

const service = new NotificationService();

export class NotificationController {
  async getAll(req: Request, res: Response) {
    try {
      const notifications = await service.getAllForUser(req.user?.id);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching notifications' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const notification = await service.create(req.body);
      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ message: 'Error creating notification' });
    }
  }

  async markAsRead(req: Request, res: Response) {
    try {
      await service.markAsRead(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: 'Error marking notification as read' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await service.delete(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting notification' });
    }
  }
}