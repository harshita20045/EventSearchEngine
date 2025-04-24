import express from 'express';
const router = express.Router();
import*as reviewController from '../controller/reviewController.js';

router.post("/save", reviewController.saveReview); // Add Review
router.get("/fetch", reviewController.fetchReviews); // Corrected function
router.delete("/delete/:id", reviewController.deleteReview); //delete a review

export default router;