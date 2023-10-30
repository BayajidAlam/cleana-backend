"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewAndRatingController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const reviewAndRating_service_1 = require("./reviewAndRating.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
// export const postRating = catchAsync(async (req: Request, res: Response) => {
//   const result = await addRatingToDB(req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Rating added successfully",
//     data: result,
//   });
// });
// export const getAllReviewController = catchAsync(
//   async (req: Request, res: Response) => {
//     const result = await getAllReviewsFromDBService();
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Reviews fetched successfully",
//       data: result,
//     });
//   }
// );
// new 
const postReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const result = yield reviewAndRating_service_1.ReviewAndRatingService.postReview(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Review Posted successfully",
        data: result,
    });
}));
const getAllReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviewAndRating_service_1.ReviewAndRatingService.getAllReview();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Review Fetched successfully",
        data: result,
    });
}));
exports.ReviewAndRatingController = {
    postReview,
    getAllReview
};
