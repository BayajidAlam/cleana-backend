"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqRoutes = void 0;
const express_1 = __importDefault(require("express"));
const faq_controller_1 = require("./faq.controller");
const router = express_1.default.Router();
router.post("/create-faq", faq_controller_1.FaqController.createFaq);
router.get("/", faq_controller_1.FaqController.getAllFaq);
router.get("/:id", faq_controller_1.FaqController.getSingleFaq);
router.patch("/:id", faq_controller_1.FaqController.updateFaq);
router.delete("/:id", faq_controller_1.FaqController.deleteFaq);
exports.FaqRoutes = router;
