import express from "express";
import { FeedbackController } from "./feedback.controller";

const router = express.Router();

router.post("/my-feedback", FeedbackController.addFeedback);
router.get("/", FeedbackController.getAllFeedback);

export const feedbackRoutes = router;
