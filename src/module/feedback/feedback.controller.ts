import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../shared/sendResponse";
import { FeedbackService } from "./feedback.service";

const addFeedback = catchAsync(async (req: Request, res: Response) => {
  
  const result = await FeedbackService.addFeedback(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Feedback Posted successfully",
    data: result,
  });
});

const getAllFeedback = catchAsync(async (req: Request, res: Response) => {

  const result = await FeedbackService.getAllFeedback();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Feedback Fetched successfully",
    data: result,
  });
});

export const FeedbackController = {
  getAllFeedback,
  addFeedback,
};
