import Event from '../models/Event.js';
import { handleError, handleNotFoundError, handleValidationError } from '../utils/errorHandler.js';
import { cache, CACHE_KEYS } from '../utils/cache.js';

const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      venue,
      basePrice,
      dynamicPrice,
      totalSeats,
      availableSeats,
      image
    } = req.body;

    const userId = req.user._id;

    const event = await Event.create({
      title,
      description,
      date,
      venue,
      basePrice,
      dynamicPrice,
      totalSeats,
      availableSeats,
      image,
      user: userId
    });

    // Clear related caches
    await cache.del(CACHE_KEYS.EVENTS);
    await cache.del(CACHE_KEYS.USER_EVENTS(userId));

    return res.status(201).json({
      message: "Event created successfully",
      success: true,
      event
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return handleValidationError(res, error);
    }
    return handleError(res, error, "Failed to create event");
  }
};

const getAllEvents = async (req, res) => {
  try {
    // Try to get from cache first
    const cachedEvents = await cache.get(CACHE_KEYS.EVENTS);
    if (cachedEvents) {
      return res.status(200).json(cachedEvents);
    }

    const events = await Event.find().populate('user', 'name email');
    
    // Cache the result
    await cache.set(CACHE_KEYS.EVENTS, events, 1800); // 30 minutes

    return res.status(200).json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    return handleError(res, error, "Failed to fetch events");
  }
};

const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    
    // Try to get from cache first
    const cachedEvent = await cache.get(CACHE_KEYS.EVENT(eventId));
    if (cachedEvent) {
      return res.status(200).json(cachedEvent);
    }

    const event = await Event.findById(eventId).populate('user', 'name email');
    
    if (!event) {
      return handleNotFoundError(res, "Event");
    }

    // Cache the result
    await cache.set(CACHE_KEYS.EVENT(eventId), event, 1800); // 30 minutes

    return res.status(200).json({
      success: true,
      event
    });
  } catch (error) {
    return handleError(res, error, "Failed to fetch event");
  }
};

// Get all events created by user
const getEventByUserId = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Try to get from cache first
    const cachedEvents = await cache.get(CACHE_KEYS.USER_EVENTS(userId));
    if (cachedEvents) {
      return res.status(200).json(cachedEvents);
    }

    const events = await Event.find({ user: userId });
    
    // Cache the result
    await cache.set(CACHE_KEYS.USER_EVENTS(userId), events, 1800); // 30 minutes

    return res.status(200).json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    return handleError(res, error, "Failed to fetch user events");
  }
};

export { createEvent, getAllEvents, getEventById, getEventByUserId };
