import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";

const bookEvent = async (req, res) => {
    try {
        const user_id = req.user._id
        const event_id = req.params.id
        const { seatNumber } = req.body;
        const event = await Event.findById(event_id);
        const totalamount = seatNumber * event.basePrice;
        const booking = await new Booking({ user: user_id, event: event_id, seatNumber, totalamount, status: "pending" }).save();
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

const orgazinerBooking=async(req,res)=>{
    try {
        const organizer_id=req.user._id
        
        const event=await Event.find({user:organizer_id})
        console.log('Fetch Event Detail Successfully',event)
        return res.status(200).json(event);
    } catch (error) {
        
    }
}

export { bookEvent, getBookByStatusbyUserId }