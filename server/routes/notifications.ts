import { Router } from 'express';
import { NotificationController } from '../controllers/notification';

const router = Router();
const controller = new NotificationController();

router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id/read', controller.markAsRead);
router.delete('/:id', controller.delete);

export const notificationRoutes = router;