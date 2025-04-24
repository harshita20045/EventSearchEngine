import '../config/connection.js';
import reviewSchemaModel from '../models/reviewModel.js';

//  Save a Review for an Event
export const saveReview = async (req, res) => {
    try {
        let { userId, eventId, rating, comment } = req.body;

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ "status": false, "message": "Rating must be between 1 and 5" });
        }

        let newReview = await reviewSchemaModel.create({
            userId, eventId, rating, comment, timestamp: Date()
        });

        res.status(201).json({ "status": true, "message": "Review submitted successfully" });

    } catch (err) {
        console.error.apply(err);
        res.status(500).json({ "status": false, "error": err.message });
    }
};

//  Fetch All Reviews for an Event
export const fetchReviews = async (req, res) => {
    try {
        let { eventId } = req.query;
        let reviews = await reviewSchemaModel.find({ eventId });

        if (reviews.length > 0) {
            let averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
            res.status(200).json({ reviews, averageRating });
        } else {
            res.status(404).json({ "message": "No reviews found for this event" });
        }

    } catch (err) {
        console.error.apply(err);
        res.status(500).json({ "error": err.message });
    }
};

//  Delete a Review
export const deleteReview = async (req, res) => {
    try {
        let { reviewId } = req.params;
        let deletedReview = await reviewSchemaModel.findOneAndDelete({ _id: reviewId });

        if (deletedReview) {
            res.status(200).json({ "status": true, "message": "Review deleted successfully" });
        } else {
            res.status(404).json({ "status": false, "message": "Review not found" });
        }

    } catch (err) {
        console.error.apply(err);
        res.status(500).json({ "error": err.message });
    }
};
