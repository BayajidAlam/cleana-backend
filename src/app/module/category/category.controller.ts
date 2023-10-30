import { Request, Response } from "express";
import httpStatus from "http-status";
import { CategoryService } from "./category.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

const addNewCategory = catchAsync(async (req: Request, res: Response) => {
  
  const result = await CategoryService.addCategory(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "category created successfully",
    data: result,
  });
});

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  
  const result = await CategoryService.getAllCategory();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "category fetched successfully",
    data: result,
  });
});

export const CategoryController = {
  addNewCategory,
  getAllCategory,
};
