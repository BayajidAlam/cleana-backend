import { Request, Response } from "express";
import httpStatus from "http-status";
import { MyCartService } from "./myCart.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const result = await MyCartService.addToCart(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product added to cart",
    data: result,
  });
});

const getMyCartByUserId = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const result = await MyCartService.getMyCartByUserId(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Cart Services fetched successfully",
    data: result,
  });
});

const deleteItemFromCart = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await MyCartService.deleteCart(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart deleted successfully",
    data: result,
  });
});

export const MyCartController = {
  addToCart,
  getMyCartByUserId,
  deleteItemFromCart,
};
