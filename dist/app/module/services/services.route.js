"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const services_controller_1 = require("./services.controller");
const router = express_1.default.Router();
router.post("/create-service", services_controller_1.ServiceController.postService);
router.get("/", services_controller_1.ServiceController.getAllService);
router.get("/new-services", services_controller_1.ServiceController.getAllNewService);
router.patch("/:id", services_controller_1.ServiceController.updateService);
router.get("/:id", services_controller_1.ServiceController.getSingleService);
router.delete("/:id", services_controller_1.ServiceController.deleteService);
router.get("/:categoryId", services_controller_1.ServiceController.getServiceByCategoryId);
exports.serviceRoutes = router;
