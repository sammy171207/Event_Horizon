import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    amount: { type: Number, required: true, min: 0 },
    method: { type: String, enum: ["online", "cash"], required: true },
    status: { type: String, enum: ["pending", "success", "failed"], required: true },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);