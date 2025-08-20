import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import nodemailer from "nodemailer";
import createTicketPdf from "../utils/createTicketPdf.js";

const bookEvent = async (req, res) => {
    try {
        const user_id = req.user._id
        const event_id = req.params.id
        const { seatNumber } = req.body;
        const event = await Event.findById(event_id);
        if (event.availableSeats < seatNumber) {
            return res.status(400).json({ message: "Not enough seats available" });
        }
        
        const totalamount = seatNumber * event.basePrice;
        let booking = await new Booking({ user: user_id, event: event_id, seatNumber, totalamount, status: "confirmed" }).save();
        console.log('sending mail to email')
        await sendBookingTicket(booking);
        console.log("Mail Send to Email")
        console.log('Update the Event Available Seats');
        await Event.findByIdAndUpdate(event_id, { $inc: { availableSeats: -seatNumber } });
        console.log('Update Booking Status Successfully');
        console.log('Book Event Successfully');
        return res.status(200).json({ message: "Book Event Successfully", booking })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" })
    }
}


const getBookByStatusbyUserId = async (req, res) => {
    try {
        const user_id = req.user._id
        const status = req.query.status;
        const query={user:user_id}
        if (status) {
            query.status = status;
        }
        const bookings = await Booking.find(query).populate("event", "title date venue image ").populate("user", "name email");
        console.log('Fetch Booking Detail Successfully', bookings)
        if (!status) {
            console.log('Status is not provided');
            return res.status(200).json(bookings);
        }
        else {
            const filteredBookings = bookings.filter((booking) => booking.status === status);
            console.log('Fetch Booking Detail Successfully by status', filteredBookings)
            return res.status(200).json(filteredBookings);
        }
    } catch (error) {
        res.json({ message: "Something went wrong" });
    }
}

const sendBookingTicket = async (booking) => {
    const user = await User.findById(booking.user);
    const event = await Event.findById(booking.event);

    if (!user || !event) {
        throw new Error("User or Event not found");
    }

    // 1. Generate the ticket PDF
    const pdfPath = await createTicketPdf(booking, user, event);

    console.log(`Sending email with ticket to ${user.email}`);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT == 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // 2. Send email with PDF attachment
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

    console.log("Email sent successfully ✅");
};





const getAllBookingById=async(req,res)=>{
    try {
        const organizer_id=req.user._id
        const event_id=req.query.id
        const events=await Event.find({user:organizer_id})
        console.log(events,'Event Detail Found by Organizer');
        const event=events.find(event=>event._id.toString()===event_id)
        if(!event){
            return res.status(404).json({message:"Event not found"})
        }
        const booking=await Booking.find({event:event_id})
        console.log('Fetch Booking Detail Successfully by user',booking)
        return res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
}

const cancellBookbyUserId=async(req,res)=>{
    try {
        const user_id=req.user._id
        const booking_id=req.params.id
        console.log('Finding Booking by Id',booking_id,user_id)
        const booking=await Booking.findById({ _id: booking_id, user: user_id });
        console.log('Booking Found',booking)
        if(!booking){
            return res.status(404).json({message:"Booking not found"})
        }else{
           await Booking.findByIdAndUpdate(booking_id,{status:"cancelled"})
           await Event.findByIdAndUpdate(booking.event,{$inc:{availableSeats:booking.seatNumber}})
           console.log('Booking Cancelled Successfully')
        }
        return res.status(200).json({message:"Booking Cancelled Successfully"})
    } catch (error) {
        console.log('error',error)
        return res.status(500).json({message:"Something went wrong"})
    }
}



export { bookEvent, getBookByStatusbyUserId,getAllBookingById,cancellBookbyUserId };