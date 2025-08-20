import mongoose from "mongoose";

const bookScheme = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    seatNumber: { type: Number, required: true, min: 1 },
    totalamount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], required: true },
    paymentId: { type: String },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Booking', bookScheme);    