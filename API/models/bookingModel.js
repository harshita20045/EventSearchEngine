import mongoose from "mongoose";

const BookingSchema = mongoose.Schema({
    bookingId: { type: Number, unique: true, required: true },
    userId: { type: Number, required: true },
    eventId: { type: Number, required: true },
    tickets: { type: Number, required: true },
    amountPaid: { type: Number, required: true },
    paymentMethod: { type: String, required: true, enum: ["Credit Card", "Debit Card", "UPI", "Net Banking"] },
    status: { type: String, default: "Confirmed" },
    timestamp: { type: Date, default: Date.now }
});

const bookingSchemaModel = mongoose.model('booking_collection', BookingSchema);
export default bookingSchemaModel;
