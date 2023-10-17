import express from "express";
import { createBlog, createFaq, getAllBlogController, getAllFaqController } from "./blog.controller";



const router = express.Router();

router.post("/blog/create-blog", createBlog);
router.post("/blog/create-faq", createFaq);
router.get("/blogs", getAllBlogController);
router.get("/faqs", getAllFaqController);
// router.patch("/services/:id", updateServiceController);
// router.get("/services/:id", getSingleServiceController);
// router.delete("/services/:id", deleteServiceController);
// router.get("/services/:categoryId", getServiceByCategoryIdController);

export const BlogAndFAQService = router;
