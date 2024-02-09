import express from "express";
import { BlogController } from "./blog.controller";

const router = express.Router();

router.post("/create-blog", BlogController.createBlog);
router.get("/", BlogController.getAllBlog);
router.get("/:id", BlogController.getSingleBlog);
router.patch("/:id", BlogController.updateBlog);
router.delete("/:id", BlogController.deleteBlog);

export const BlogRoutes = router;
