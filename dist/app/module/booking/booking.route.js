"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post("/book", booking_controller_1.BookingController.addBooking);
router.get("/", booking_controller_1.BookingController.getAllBooking);
router.patch("/:id", booking_controller_1.BookingController.updateBooking);
router.get("/mybooking/:userId", booking_controller_1.BookingController.getBookingByUserId);
router.delete("/mybooking/:userId", booking_controller_1.BookingController.deleteBooking);
exports.bookingRoutes = router;
