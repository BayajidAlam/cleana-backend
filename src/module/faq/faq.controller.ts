import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../shared/pick";
import { paginationFields } from "../../constants/pagination";
import { FaqService } from "./faq.service";

// create faq
const createFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.createFaq(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faq created successfully",
    data: result,
  });
});

// get all faq
const getAllFaq = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);
  const result = await FaqService.getAllFaq(options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faqs fetched successfully",
    data: result,
  });
});

// get single faq
const getSingleFaq = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);
  const result = await FaqService.getSingleFaq(id);

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
});

// update faq
const updateFaq = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;

  try {
    const result = await FaqService.updateFaq(id, payload);

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
});

// delete Faq
const deleteFaq = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FaqService.deleteFaq(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faq deleted successfully",
    data: result,
  });
});

export const FaqController = {
  createFaq,
  getAllFaq,
  getSingleFaq,
  updateFaq,
  deleteFaq,
};
