import { Router } from 'express';
import { SubscriptionController } from '../controllers/subscription';

const router = Router();
const controller = new SubscriptionController();

router.get('/status', controller.getStatus);
router.post('/upgrade', controller.upgrade);
router.post('/downgrade', controller.downgrade);

export const subscriptionRoutes = router;