import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../shared/pick";
import { paginationFields } from "../../constants/pagination";
import {
  deleteBlogFromDB,
  deleteFaqFromDB,
  getAllBlogFromDB,
  getAllFaqFromDB,
  getSingleBlogService,
  getSingleFaqService,
  postBlogToDb,
  postFAQToDb,
  updateBFaqInDB,
  updateBlogInDB,
} from "./blog.service";



// create faq
export const createFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await postFAQToDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faq created successfully",
    data: result,
  });
});

// get all faq
export const getAllFaqController = catchAsync(
  async (req: Request, res: Response) => {
    const options = pick(req.query, paginationFields);
    const result = await getAllFaqFromDB(options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Faqs fetched successfully",
      data: result,
    });
  }
);

// get single faq
export const getSingleFaqController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    console.log(id);
    const result = await getSingleFaqService(id);

    if (!result) {
      return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: false,
        message: "Faq not found",
        data: "",
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Faq Fetched successfully",
      data: result,
    });
  }
);

// update faq 
export const updateFaqController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
   
    try {
      const result = await updateBFaqInDB(id, payload);

      if (result) {
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Faq updated successfully",
          data: result,
        });
      } else {
        sendResponse(res, {
          statusCode: httpStatus.NOT_FOUND,
          success: false,
          message: "Faq not found with the specified ID",
        });
      }
    } catch (error) {
    
      sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Error while updating the Faq",
      });
    }
  }
);

// delete Faq
export const deleteFaqController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await deleteFaqFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Faq deleted successfully",
      data: result,
    });
  }
);
