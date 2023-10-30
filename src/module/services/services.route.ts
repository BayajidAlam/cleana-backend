import express from "express";
import { ServiceController } from "./services.controller";

const router = express.Router();

router.post("/create-service", ServiceController.postService);
router.get("/", ServiceController.getAllService);
router.get("/new-services", ServiceController.getAllNewService);
router.patch("/:id", ServiceController.updateService);
router.get("/:id", ServiceController.getSingleService);
router.delete("/:id", ServiceController.deleteService);
router.get("/:categoryId", ServiceController.getServiceByCategoryId);

export const serviceRoutes = router;
