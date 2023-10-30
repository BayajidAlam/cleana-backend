import express from "express";
import { BookingController } from "./booking.controller";

const router = express.Router();

router.post("/book", BookingController.addBooking);
router.get("/", BookingController.getAllBooking);
router.patch("/:id", BookingController.updateBooking);
router.get("/mybooking/:userId", BookingController.getBookingByUserId);
router.delete("/mybooking/:userId", BookingController.deleteBooking);

export const bookingRoutes = router;
