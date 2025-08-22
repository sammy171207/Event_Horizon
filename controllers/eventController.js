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

// Update event
const updateEvent = async (req, res) => {
  try {
     const user_id= req.user._id;
     const event_id = req.params.id;
     const { title, description, date, venue, basePrice, dynamicPrice, totalSeats, availableSeats, image } = req.body;

     const event = await Event.findOne({ _id: event_id, user: user_id });

     if (!event) {
       return handleNotFoundError(res, "Event");
     }

     event.title = title;
     event.description = description;
     event.date = date;
     event.venue = venue;
     event.basePrice = basePrice;
     event.dynamicPrice = dynamicPrice;
     event.totalSeats = totalSeats;
     event.availableSeats = availableSeats;
     event.image = req.file?.path || req.body.image;;
     event.date=Date.now();

     await event.save();
     console.log('event updated');
     return res.status(200).json({
       message: "Event updated successfully",
       success: true,
       event
     })
  } catch (error) {
    console.log('error', error);
    return handleError(res, error, "Failed to update event");
  }
}

const deleteEvent = async (req, res) => {
  try {
    const user_id= req.user._id;
    const event_id = req.params.id;

    const event = await Event.findOne({ _id: event_id, user: user_id });

    if (!event) {
      return handleNotFoundError(res, "Event");
    }

    await event.deleteOne();

    

    return res.status(200).json({
      message: "Event deleted successfully",
      success: true
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getOrganizerEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const organizerId = req.user._id;

    const event = await Event.findOne({ _id: eventId, user: organizerId });

    if (!event) {
      return handleNotFoundError(res, "Event");
    }

    return res.status(200).json({
      success: true,
      event
    });
  } catch (error) {
    return handleError(res, error, "Failed to fetch event");
  }
};

export { createEvent, getAllEvents, getEventById, getEventByUserId , updateEvent,deleteEvent, getOrganizerEventById};
