import express from 'express';
import * as eventController from '../controller/eventController.js';
const router = express.Router();

router.post('/', eventController.createEvent); // Create event
router.get('/', eventController.fetchEvent); // Fetch events
router.get('/:id', eventController.getSingleEvent); // Get single event
router.patch('/:id', eventController.updateEvent); // Update event
router.delete('/:id', eventController.deleteEvent); // Delete event
router.get('/search', eventController.searchEvent); // Search event

export default router;
