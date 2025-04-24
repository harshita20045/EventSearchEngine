import express from 'express';
import cors from 'cors';
import * as userController from '../controller/userController.js';

const router = express.Router();
router.use(cors()); // Enable CORS for frontend connectivity

// User Registration & Login
router.post("/save", userController.save); // Adjusted to match frontend
router.post("/login", userController.login);

// CRUD Operations
router.get("/:id", userController.getUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;