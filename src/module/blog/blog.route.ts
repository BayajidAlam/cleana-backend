import express from "express";
import { createBlog, createFaq, deleteBlogController, deleteFaqController, getAllBlogController, getAllFaqController, getSingleBlogController, getSingleFaqController, updateBlogController, updateFaqController } from "./blog.controller";



const router = express.Router();

router.post("/blog/create-blog", createBlog);
router.post("/blog/create-faq", createFaq);

router.get("/blogs", getAllBlogController);
router.get("/faqs", getAllFaqController);

router.get("/blog/:id", getSingleBlogController);
router.get("/faq/:id", getSingleFaqController);

router.patch("/blog/:id", updateBlogController);
router.patch("/faq/:id", updateFaqController);

router.delete("/blog/:id", deleteBlogController);
router.delete("/faq/:id", deleteFaqController);


// router.get("/services/:categoryId", getServiceByCategoryIdController);

export const BlogAndFAQService = router;
