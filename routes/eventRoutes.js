import express from 'express';
import Event from '../models/Event.js';
import { getAllEvents, getEventById } from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getAllEvents);

router.get('/:id', getEventById);

export default router;