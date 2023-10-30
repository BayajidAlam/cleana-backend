import { Request, Response } from "express";
import httpStatus from "http-status";
import { BookingService } from "./booking.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";


const addBooking = catchAsync(
  async (req: Request, res: Response) => {

    const result = await BookingService.addBooking(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "booking created successfully",
      data: result,
    });
  }
);

const getBookingByUserId = catchAsync(
  async (req: Request, res: Response) => {

    const userId = req.params.userId;

    const result = await BookingService.getBookingByUserId(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User booked Services fetched successfully",
      data: result,
    });
  }
);

const getAllBooking = catchAsync(
  async (req: Request, res: Response) => {

    const result = await BookingService.getAllBooking();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Bookings fetched successfully",
      data: result,
    });
  }
);

const updateBooking = catchAsync(
  async (req: Request, res: Response) => {

    const id = req.params.id;
    const payload = req.body;

    const result = await BookingService.updateBooking(id, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking updated successfully",
      data: result,
    });
  }
);

const deleteBooking = catchAsync(
  async (req: Request, res: Response) => {
    
    const userId = req.params.userId;

    const result = await BookingService.deleteBooking(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking deleted successfully",
      data: result,
    });
  }
);


export const BookingController = {
  addBooking,
  getBookingByUserId,
  getAllBooking,
  updateBooking,
  deleteBooking
}