import express from 'express';
import {
    createEvent,
    getEventByUserId as getOrganizerEvents, // Renaming for clarity
    getOrganizerEventById,
    updateEvent,
    deleteEvent
} from '../controllers/eventController.js';
import { protect, roleBasedAccess } from '../middlewares/authMiddleware.js';
import { getAllBookingByEventId, getAllBookingsForOrganizer } from '../controllers/bookController.js';
import { getDashboardStats } from '../controllers/organizerController.js';

const router = express.Router();

//======================================== Dashboard ========================================

/**
 * @desc    Get dashboard stats for the organizer
 * @route   GET /api/organizer/dashboard
 * @access  Private (Organizer)
 */
router.get('/dashboard', protect, roleBasedAccess(['organizer']), getDashboardStats);


//======================================== Event Management ========================================

/**
 * @desc    Create a new event
 * @route   POST /api/organizer/events
 * @access  Private (Organizer)
 */
router.post('/events', protect, roleBasedAccess(['organizer']), createEvent);

/**
 * @desc    Get all events for the logged-in organizer
 * @route   GET /api/organizer/events
 * @access  Private (Organizer)
 */
router.get('/events', protect, roleBasedAccess(['organizer']), getOrganizerEvents);

/**
 * @desc    Get a single event by ID for the logged-in organizer
 * @route   GET /api/organizer/events/:id
 * @access  Private (Organizer)
 */
router.get('/events/:id', protect, roleBasedAccess(['organizer']), getOrganizerEventById);

/**
 * @desc    Update an event
 * @route   PUT /api/organizer/events/:id
 * @access  Private (Organizer)
 */
router.put('/events/:id', protect, roleBasedAccess(['organizer']), updateEvent);

/**
 * @desc    Delete an event
 * @route   DELETE /api/organizer/events/:id
 * @access  Private (Organizer)
 */
router.delete('/events/:id', protect, roleBasedAccess(['organizer']), deleteEvent);


//======================================== Booking Management ========================================

/**
 * @desc    Get all bookings for the logged-in organizer
 * @route   GET /api/organizer/bookings
 * @access  Private (Organizer)
 */
router.get('/bookings', protect, roleBasedAccess(['organizer']), getAllBookingsForOrganizer);


/**
 * @desc    Get all bookings for a specific event
 * @route   GET /api/organizer/events/:id/bookings
 * @access  Private (Organizer)
 */
router.get('/events/:id/bookings', protect, roleBasedAccess(['organizer']), getAllBookingByEventId);

export default router;
