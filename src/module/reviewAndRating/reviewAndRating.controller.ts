import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { ReviewAndRatingService } from "./reviewAndRating.service";


// export const postRating = catchAsync(async (req: Request, res: Response) => {
//   const result = await addRatingToDB(req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Rating added successfully",
//     data: result,
//   });
// });

// export const getAllReviewController = catchAsync(
//   async (req: Request, res: Response) => {
//     const result = await getAllReviewsFromDBService();
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Reviews fetched successfully",
//       data: result,
//     });
//   }
// );


// new 
const postReview = catchAsync(
  async (req: Request, res: Response) => {
    console.log(req.body);
    const result = await ReviewAndRatingService.postReview(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review Posted successfully",
      data: result,
    });
  }
);

const getAllReview = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReviewAndRatingService.getAllReview();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review Fetched successfully",
      data: result,
    });
  }
);



export const ReviewAndRatingController = {
  postReview,
  getAllReview
}