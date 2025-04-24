import express from 'express';
const router = express.Router();
import * as adminController from '../controller/adminController.js';

router.get("/users", adminController.getAllUsers); // Fetch all users
router.patch("/updateUser/:id", adminController.updateUserStatus); // Update user status
router.delete("/deleteUser/:id", adminController.deleteUser); // Delete user

router.get("/events", adminController.getAllEvents); // Fetch events
router.patch("/approveEvent/:id", adminController.approveEvent); // Approve event
router.delete("/deleteEvent/:id", adminController.deleteEvent); // Delete event

export default router;   