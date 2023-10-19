import express from "express";
import {
  addFeedbackController,
  addReviewController,
  getAllFeedbackController,
  getAllReviewController,
} from "./feedback.controller";

const router = express.Router();

router.post("/my-feedback", addFeedbackController);
router.post("/my-review", addReviewController);
router.get("/all-feedbacks", getAllFeedbackController);
router.get("/all-review", getAllReviewController);

export const feedbackRoutes = router;
