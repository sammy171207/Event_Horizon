import Event from '../models/Event.js';
import Booking from '../models/Booking.js';
import { handleError } from '../utils/errorHandler.js';

const getDashboardStats = async (req, res) => {
    try {
        const organizerId = req.user._id;

        // Get all events for the organizer
        const events = await Event.find({ user: organizerId });
        const eventIds = events.map(event => event._id);

        // 1. Total events created
        const totalEvents = events.length;

        // 2. Total bookings received
        const bookings = await Booking.find({ event: { $in: eventIds } });
        const totalBookings = bookings.length;

        // 3. Total revenue
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalamount, 0);

        // 4. Upcoming events
        const upcomingEvents = events.filter(event => new Date(event.date) > new Date());

        return res.status(200).json({
            success: true,
            stats: {
                totalEvents,
                totalBookings,
                totalRevenue,
                upcomingEventsCount: upcomingEvents.length,
                upcomingEvents
            }
        });
    } catch (error) {
        return handleError(res, error, "Failed to fetch dashboard stats");
    }
};

export { getDashboardStats };
