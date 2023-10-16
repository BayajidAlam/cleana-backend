import express from "express";
import { createBlog } from "./blog.controller";



const router = express.Router();

router.post("/blog/create-blog", createBlog);
// router.get("/services", getAllServiceController);
// router.patch("/services/:id", updateServiceController);
// router.get("/services/:id", getSingleServiceController);
// router.delete("/services/:id", deleteServiceController);
// router.get("/services/:categoryId", getServiceByCategoryIdController);

export const BlogAndFAQService = router;
