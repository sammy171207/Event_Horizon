import express from 'express';
import { getAllEvents, getEventById } from '../controllers/eventController.js';

const router = express.Router();

// Get all events
router.get('/', getAllEvents);

// Get event by ID
router.get('/:id', getEventById);

export default router;