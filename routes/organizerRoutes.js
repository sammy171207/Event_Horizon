import express from 'express';
import { createEvent, getEventByUserId } from '../controllers/eventController.js';
import { protect, roleBasedAccess } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post(
  '/create-event',
  protect,
  roleBasedAccess(['organizer']),
  createEvent
);


router.get('/eventsoforganizer',protect,roleBasedAccess(['organizer']),getEventByUserId)
export default router;
