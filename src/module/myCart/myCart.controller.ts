import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { addCartToDB, deleteCartFromDB, getMyCartByUserIdFromDB } from "./myCart.service";

export const addTOCartController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await addCartToDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product added to cart",
      data: result,
    });
  }
);

export const getMyCartByUserIdController = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
 
    const result = await getMyCartByUserIdFromDB(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Cart Services fetched successfully",
      data: result,
    });
  }
);


export const deleteItemFromCart = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    
    const result = await deleteCartFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cart deleted successfully",
      data: result,
    });
  }
);
