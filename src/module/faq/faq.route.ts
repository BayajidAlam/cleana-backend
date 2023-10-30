import express from "express";

const router = express.Router();

router.post("/blog/create-faq", createFaq);
router.get("/faqs", getAllFaqController);
router.get("/faq/:id", getSingleFaqController);
router.patch("/faq/:id", updateFaqController);
router.delete("/faq/:id", deleteFaqController);


// router.get("/services/:categoryId", getServiceByCategoryIdController);

export const BlogAndFAQService = router;
