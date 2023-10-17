import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../shared/pick";
import { paginationFields } from "../../constants/pagination";
import { getAllBlogFromDB, getAllFaqFromDB, postBlogToDb, postFAQToDb } from "./blog.service";
import {
  getSingleServiceByCategoryIDFromDB,
  updateServiceFromDB,
} from "../services/services.service";

// create blog
export const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await postBlogToDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "BLog created successfully",
    data: result,
  });
});

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

// get all blog
export const getAllBlogController = catchAsync(
  async (req: Request, res: Response) => {
  
    const options = pick(req.query, paginationFields);
    const result = await getAllBlogFromDB(options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blogs fetched successfully",
      data: result,
    });
  }
);

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

export const getServiceByCategoryIdController = catchAsync(
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;

    const result = await getSingleServiceByCategoryIDFromDB(categoryId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Service fetched successfully",
      data: result,
    });
  }
);

export const updateServiceController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;

    try {
      const result = await updateServiceFromDB(id, payload);

      if (result) {
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Service updated successfully",
          data: result,
        });
      } else {
        sendResponse(res, {
          statusCode: httpStatus.NOT_FOUND,
          success: false,
          message: "Service not found with the specified ID",
        });
      }
    } catch (error) {
      // Handle any other errors that might occur during the update
      sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Error while updating the service",
      });
    }
  }
);

// export const deleteServiceController = catchAsync(
//   async (req: Request, res: Response) => {
//     const id = req.params.id;

//     const result = await deleteServiceFromDB(id);
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Service deleted successfully",
//       data: result,
//     });
//   }
// );

// export const getSingleServiceController = catchAsync(
//   async (req: Request, res: Response) => {
//     const id = req.params.id;
//     console.log(id);
//     const result = await getSingleServiceService(id);
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Service deleted successfully",
//       data: result,
//     });
//   }
// );
