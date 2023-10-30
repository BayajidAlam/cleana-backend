import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";



const signUpUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;

    const result = await AuthService.signUpUser(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User CREATED successfully !",
      data: result,
    });
  }
);

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.loginUser(loginData);
  
  const accessToken = result?.accessToken;
  const refreshToken = result?.refreshToken;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    token: accessToken,
  });
});

export const AuthController = {
  signUpUser,
  loginUser,
}