import express from 'express';
const router = express.Router();
import * as interactionController from '../controller/interactionController.js';

router.post('/join', interactionController.joinEvent); // user joins an event
router.post('/favorite', interactionController.favoriteEvent); // user favorites an event
router.delete("/unfavorite", interactionController.unfavoriteEvent);
router.delete("/unregister", interactionController.unregisterEvent); // user unregister from an event

export default router;