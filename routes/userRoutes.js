import express from 'express';
import {
    bookEvent,
    getBookByStatusbyUserId,
    cancellBookbyUserId
} from '../controllers/bookController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { getProfile } from '../controllers/userController.js';

const router = express.Router();

// -- User Profile Route --
// GET /api/users/profile -> Get user's own profile
router.get('/profile', protect, getProfile);

// -- User Booking Routes --
// POST /api/users/book/:id -> User books a ticket for a specific event
router.post('/book/:id', protect, bookEvent);

// GET /api/users/my-bookings -> Get all bookings made by the logged-in user
router.get('/my-bookings', protect, getBookByStatusbyUserId);

// PATCH /api/users/cancel/:id -> User cancels their own booking
router.patch('/cancel/:id', protect, cancellBookbyUserId);

export default router;