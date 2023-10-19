import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../shared/sendResponse";
import { addFeedbackToDB, addReviewToDB, getAllFeedbackFromDB, getAllReviewFromDB } from "./feedback.service";

export const addFeedbackController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await addFeedbackToDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Feedback Posted successfully",
      data: result,
    });
  }
);

export const addReviewController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await addReviewToDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review Posted successfully",
      data: result,
    });
  }
);

export const getAllFeedbackController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllFeedbackFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Feedback Fetched successfully",
      data: result,
    });
  }
);

export const getAllReviewController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllReviewFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review Fetched successfully",
      data: result,
    });
  }
);
