import '../config/connection.js';
import bookingSchemaModel from '../models/bookingModel.js';

//  Book a Ticket
export const bookTicket = async (req, res) => {
    try {
        let { userId, eventId, tickets, amountPaid, paymentMethod } = req.body;
        let bookingId = Math.floor(Math.random() * 1000000); // Generate a random booking ID

        let newBooking = await bookingSchemaModel.create({
            bookingId, userId, eventId, tickets, amountPaid, paymentMethod, status: "Confirmed", timestamp: Date()
        });

        res.status(201).json({ "status": true, "message": "Ticket booked successfully", "bookingId": bookingId });

    } catch (err) {
        res.status(500).json({ "status": false, "error": err.message });
    }
};

//  Fetch Booking Details
export const fetchBookings = async (req, res) => {
    try {
        let { userId } = req.query;
        let bookings = await bookingSchemaModel.find({ userId });

        if (bookings.length > 0) {
            res.status(200).json({ bookings });
        } else {
            res.status(404).json({ "message": "No bookings found" });
        }

    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
};

// Cancel a Booking
export const cancelBooking = async (req, res) => {
    try {
        let { bookingId } = req.body;
        let canceledBooking = await bookingSchemaModel.findOneAndUpdate(
            { bookingId },
            { status: "Cancelled" },
            { new: true }
        );

        if (canceledBooking) {
            res.status(200).json({ "status": true, "message": "Booking cancelled successfully" });
        } else {
            res.status(404).json({ "status": false, "message": "Booking not found" });
        }

    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
};
