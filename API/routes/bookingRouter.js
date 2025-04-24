import express from 'express';
const router = express.Router();
import * as bookingController from '../controller/bookingController.js';

// Routes
router.post("/book", bookingController.bookTicket); // Book a Ticket
router.get("/fetch", bookingController.fetchBookings); // Fetch Booking Details
router.delete("/cancel", bookingController.cancelBooking); // Cancel a Booking

export default router;
