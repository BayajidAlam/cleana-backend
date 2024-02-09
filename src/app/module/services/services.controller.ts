import { Request, Response } from "express";
import { servicesFilterableFields } from "./services.constant";
import { Service } from "./services.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";

const postService = catchAsync(async (req: Request, res: Response) => {

  const result = await Service.addService(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service created successfully",
    data: result,
  });
});


const getAllService = catchAsync(
  async (req: Request, res: Response) => {
    
    const filters = pick(req.query, servicesFilterableFields);
    const options = pick(req.query, paginationFields);

    const result = await Service.getAllService(filters, options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Services fetched successfully",
      meta: result.meta,
      data: result,
    });
  }
);

const getAllNewService = catchAsync(
  async (req: Request, res: Response) => {

    const result = await Service.getAllNewService();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Services fetched successfully",
      data: result,
    });
  }
);

const getServiceByCategoryId = catchAsync(
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
  
    const result = await Service.getSingleServiceByCategoryID(categoryId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Service fetched successfully",
      data: result,
    });
  }
);

const updateService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;

  try {
    const result = await Service.updateService(id, payload);

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
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Error while updating the service",
    });
  }
});
;

const deleteService = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
   
    const result = await Service.deleteService(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Service deleted successfully",
      data: result,
    });
  }
);

const getSingleService = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    console.log(id);
    const result = await Service.getSingleService(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Service retrive successfully",
      data: result,
    });
  }
);



export const ServiceController = {
  postService,
  getAllService,
  getAllNewService,
  getServiceByCategoryId,
  updateService,
  deleteService,
  getSingleService
}