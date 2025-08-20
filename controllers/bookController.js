import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import nodemailer from "nodemailer";
import createTicketPdf from "../utils/createTicketPdf.js";
import { handleError, handleNotFoundError, handleValidationError } from '../utils/errorHandler.js';
import { cache, CACHE_KEYS } from '../utils/cache.js';

const bookEvent = async (req, res) => {
    try {
        const user_id = req.user._id;
        const event_id = req.params.id;
        const { seatNumber } = req.body;

        // Validate seat number
        if (!seatNumber || seatNumber < 1) {
            return res.status(400).json({
                message: "Invalid seat number",
                success: false
            });
        }

        // Find event
        const event = await Event.findById(event_id);
        if (!event) {
            return handleNotFoundError(res, "Event");
        }

        // Check seat availability
        if (event.availableSeats < seatNumber) {
            return res.status(400).json({
                message: "Not enough seats available",
                success: false,
                availableSeats: event.availableSeats
            });
        }

        const totalamount = seatNumber * event.basePrice;

        // Create booking
        const booking = await Booking.create({
            user: user_id,
            event: event_id,
            seatNumber,
            totalamount,
            status: "confirmed"
        });

        // Send email with ticket
        try {
            await sendBookingTicket(booking);
        } catch (emailError) {
            console.error("Failed to send email:", emailError);
            // Don't fail the booking if email fails
        }

        // Update event available seats
        await Event.findByIdAndUpdate(event_id, {
            $inc: { availableSeats: -seatNumber }
        });

        // Clear related caches
        await cache.del(CACHE_KEYS.BOOKINGS(user_id));
        await cache.del(CACHE_KEYS.EVENT(event_id));

        return res.status(200).json({
            message: "Event booked successfully",
            success: true,
            booking
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return handleValidationError(res, error);
        }
        return handleError(res, error, "Failed to book event");
    }
};

const getBookByStatusbyUserId = async (req, res) => {
    try {
        const user_id = req.user._id;
        const status = req.query.status;

        // Try to get from cache first
        const cacheKey = status ? `${CACHE_KEYS.BOOKINGS(user_id)}:${status}` : CACHE_KEYS.BOOKINGS(user_id);
        const cachedBookings = await cache.get(cacheKey);
        if (cachedBookings) {
            return res.status(200).json(cachedBookings);
        }

        const query = { user: user_id };
        if (status) {
            query.status = status;
        }

        const bookings = await Booking.find(query)
            .populate("event", "title date venue image")
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        // Cache the result
        await cache.set(cacheKey, bookings, 900); // 15 minutes

        return res.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        });
    } catch (error) {
        return handleError(res, error, "Failed to fetch bookings");
    }
};

const sendBookingTicket = async (booking) => {
    const user = await User.findById(booking.user);
    const event = await Event.findById(booking.event);

    if (!user || !event) {
        throw new Error("User or Event not found");
    }

    // Generate the ticket PDF
    const pdfPath = await createTicketPdf(booking, user, event);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT == 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // Send email with PDF attachment
    await transporter.sendMail({
        from: `"Event Booking" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: "🎟 Your Event Booking Ticket",
        html: `
            <h1>Booking Ticket</h1>
            <p><b>Event:</b> ${event.title}</p>
            <p><b>Date:</b> ${new Date(event.date).toLocaleDateString()}</p>
            <p><b>Venue:</b> ${event.venue}</p>
            <p><b>Seat Number:</b> ${booking.seatNumber}</p>
            <p><b>Total Amount:</b> ₹${booking.totalamount}</p>
            <p><b>Status:</b> ${booking.status}</p>
        `,
        attachments: [
            {
                filename: `ticket_${booking._id}.pdf`,
                path: pdfPath,
                contentType: "application/pdf"
            }
        ]
    });
};

const getAllBookingById = async (req, res) => {
    try {
        const organizer_id = req.user._id;
        const event_id = req.query.id;

        if (!event_id) {
            return res.status(400).json({
                message: "Event ID is required",
                success: false
            });
        }

        // Verify organizer owns the event
        const event = await Event.findOne({ _id: event_id, user: organizer_id });
        if (!event) {
            return handleNotFoundError(res, "Event");
        }

        const bookings = await Booking.find({ event: event_id })
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        });
    } catch (error) {
        return handleError(res, error, "Failed to fetch event bookings");
    }
};

const cancellBookbyUserId = async (req, res) => {
    try {
        const user_id = req.user._id;
        const booking_id = req.params.id;

        const booking = await Booking.findOne({ _id: booking_id, user: user_id });
        if (!booking) {
            return handleNotFoundError(res, "Booking");
        }

        if (booking.status === "cancelled") {
            return res.status(400).json({
                message: "Booking is already cancelled",
                success: false
            });
        }

        // Update booking status
        await Booking.findByIdAndUpdate(booking_id, { status: "cancelled" });

        // Restore seats to event
        await Event.findByIdAndUpdate(booking.event, {
            $inc: { availableSeats: booking.seatNumber }
        });

        // Clear related caches
        await cache.del(CACHE_KEYS.BOOKINGS(user_id));
        await cache.del(CACHE_KEYS.BOOKING(booking_id));

        return res.status(200).json({
            message: "Booking cancelled successfully",
            success: true
        });
    } catch (error) {
        return handleError(res, error, "Failed to cancel booking");
    }
};

export { bookEvent, getBookByStatusbyUserId, getAllBookingById, cancellBookbyUserId };