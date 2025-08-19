import express from 'express';
import { getProfile } from '../controllers/userController.js';
import { protect, roleBasedAccess } from '../middlewares/authMiddleware.js';
import { bookEvent, getBookByStatusbyUserId } from '../controllers/bookController.js';
const router = express.Router();

router.get('/profile',protect, getProfile);

router.post('/book-event/:id',protect,roleBasedAccess(['user']),bookEvent)

router.get('/bookingofUser',protect,roleBasedAccess(['user']),getBookByStatusbyUserId)

export default router;