import { Feedback, ReviewAndRating } from "@prisma/client";
import prisma from "../../shared/prisma";

export const addFeedbackToDB = async (data: Feedback): Promise<Feedback> => {
  const result = prisma.feedback.create({
    data,
  });
  return result;
};
export const addReviewToDB = async (
  data: ReviewAndRating
): Promise<ReviewAndRating> => {
  const result = prisma.reviewAndRating.create({
    data,
  });
  return result;
};

export const getAllFeedbackFromDB = async () => {
  const result = prisma.feedback.findMany({});
  return result;
};
export const getAllReviewFromDB = async () => {
  const result = prisma.reviewAndRating.findMany({
    include: {
      service: true,
    },
  });
  return result;
};
