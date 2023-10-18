import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../shared/sendResponse";
import catchAsync from "../../shared/catchAsync";
import {
  deleteSingleUserFromDb,
  getAllUsersFromDB,
  getSingleUserById,
  loginUserToDB,
  signUpUserTODB,
  updateUserRole,
} from "./user.service";
import pick from "../../shared/pick";
import { userFilterAbleField } from "./user.constant";

export const signUpUserController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await signUpUserTODB(data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User CREATED successfully !",
      data: result,
    });
  }
);

export const loginUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.headers.authorization, "header");
  const { ...loginData } = req.body;
  const result = await loginUserToDB(loginData);
  console.log(result?.accessToken, result?.refreshToken);
  const accessToken = result?.accessToken;

  const refreshToken = result?.refreshToken;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    token: accessToken,
  });
});

export const getAllUsersController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, userFilterAbleField);

    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await getAllUsersFromDB(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users fetched successfully !",
      data: result,
    });
  }
);

export const getSingleUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await getSingleUserById(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users fetched successfully !",
      data: result,
    });
  }
);

export const updatgeRoleUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    const result = await updateUserRole(id, data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users fetched successfully !",
      data: result,
    });
  }
);

export const deleteSingleUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await deleteSingleUserFromDb(id);
    if (result) {
      return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users deleted successfully !",
        data: result,
      });
    } else {
      return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: false,
        message: "User Not found !",
        data: "",
      });
    }
  }
);
