import { Feedback, ReviewAndRating } from "@prisma/client";
import prisma from "../../shared/prisma";

const addFeedback = async (data: Feedback): Promise<Feedback> => {
  
  const result = prisma.feedback.create({
    data,
  });
  return result;
};

const getAllFeedback = async () => {
  
  const result = await prisma.feedback.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

export const FeedbackService = {
  addFeedback,
  getAllFeedback,
};
