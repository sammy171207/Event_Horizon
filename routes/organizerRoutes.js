import express from 'express';
import { createEvent, getEventByUserId } from '../controllers/eventController.js';
import { protect, roleBasedAccess } from '../middlewares/authMiddleware.js';
import { getAllBookingById } from '../controllers/bookController.js';

const router = express.Router();

router.post(
  '/create-event',
  protect,
  roleBasedAccess(['organizer']),
  createEvent
);

router.get('/',protect,roleBasedAccess(['organizer']),getEventByUserId)

// Example: GET /api/organizer/bookings?id=EVENT_ID
router.get("/bookings", protect,roleBasedAccess(["organizer"]), getAllBookingById);
export default router;
``