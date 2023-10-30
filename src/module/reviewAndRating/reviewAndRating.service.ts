import { ReviewAndRating, Services } from "@prisma/client";
import prisma from "../../shared/prisma";
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
const postReview = async (data: ReviewAndRating): Promise<ReviewAndRating> => {
  const result = prisma.reviewAndRating.create({
    data,
  });
  return result;
};

const getAllReview = async () => {
  const result = prisma.reviewAndRating.findMany({
    include: {
      service: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

export const ReviewAndRatingService = {
  postReview,
  getAllReview,
};
