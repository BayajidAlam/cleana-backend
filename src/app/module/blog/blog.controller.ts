import { Request, Response } from "express";
import { BlogService } from "./blog.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";

// create blog
const createBlog = catchAsync(async (req: Request, res: Response) => {

  const result = await BlogService.createBlog(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "BLog created successfully",
    data: result,
  });
});

// get all blog
const getAllBlog = catchAsync(
  async (req: Request, res: Response) => {

    const options = pick(req.query, paginationFields);

    const result = await BlogService.getAllBlog(options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blogs fetched successfully",
      data: result,
    });
  }
);

// get single blog
const getSingleBlog = catchAsync(
  async (req: Request, res: Response) => {

    const id = req.params.id;

    const result = await BlogService.getSingleBlog(id);

    if (!result) {
      return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: false,
        message: "Blog not found",
        data: "",
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog Fetched successfully",
      data: result,
    });
  }
);

// update blog 
const updateBlog = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;

    try {
      const result = await BlogService.updateBlog(id, payload);

      if (result) {
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Blog updated successfully",
          data: result,
        });
      } else {
        sendResponse(res, {
          statusCode: httpStatus.NOT_FOUND,
          success: false,
          message: "Blog not found with the specified ID",
        });
      }
    } catch (error) {
    
      sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Error while updating the service",
      });
    }
  }
);

// delete blog 
const deleteBlog = catchAsync(
  async (req: Request, res: Response) => {
    
    const id = req.params.id;

    const result = await BlogService.deleteBlog(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog deleted successfully",
      data: result,
    });
  }
);




export const BlogController = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog
}