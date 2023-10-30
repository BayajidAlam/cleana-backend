import { Feedback, ReviewAndRating } from "@prisma/client";
import prisma from "../../shared/prisma";

export const addFeedbackToDB = async (data: Feedback): Promise<Feedback> => {
  console.log(data,'feedback');
  const result = prisma.feedback.create({
    data,
  });
  return result;
};


export const getAllFeedbackFromDB = async () => {
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

