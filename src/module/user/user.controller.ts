import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../shared/sendResponse";
import catchAsync from "../../shared/catchAsync";
import {
  deleteSingleUserFromDb,
  getAllUsersFromDB,
  getSingleUserById,
  updateUserRole,
} from "./user.service";
import pick from "../../shared/pick";
import { userFilterAbleField } from "./user.constant";



const getAllUsers: RequestHandler = catchAsync(
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

const getSingleUser: RequestHandler = catchAsync(
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

const updateRoledUser: RequestHandler = catchAsync(
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

const deleteSingleUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
      console.log(id,'id cnt');
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


export const UserController = {
  getAllUsers,
  getSingleUser,
  updateRoledUser,
  deleteSingleUser
}