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
exports.ReviewAndRatingService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// export const addRatingToDB = async (
//   data: ReviewAndRating
// ): Promise<ReviewAndRating> => {
//   const result = prisma.reviewAndRating.create({
//     data,
//     include: {
//       service: true,
//     },
//   });
//   return result;
// };
// export const getAllReviewsFromDBService = async () => {
//   const result = await prisma.reviewAndRating.findMany({
//     include: {
//       service: {
//         include: {
//           category: true,
//         },
//       },
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
//   return result;
// };
// new
const postReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.reviewAndRating.create({
        data,
    });
    return result;
});
const getAllReview = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.reviewAndRating.findMany({
        include: {
            service: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
});
exports.ReviewAndRatingService = {
    postReview,
    getAllReview,
};
