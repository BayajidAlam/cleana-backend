import express from "express";
import {  ReviewAndRatingController } from "./reviewAndRating.controller";
const router = express.Router();

// router.post("/review", postRating);
// router.get("/reviews", getAllReviewController);

// new 
router.post("/", ReviewAndRatingController.postReview);
router.get("/", ReviewAndRatingController.getAllReview);

export const ratingRoutes = router;
