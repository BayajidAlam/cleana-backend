
import { BlogPost, Faq } from "@prisma/client";
import prisma from "../../shared/prisma";
import { IPaginationOptions } from "../../constants/pagination";
import { paginationHelpers } from "../../helpers/paginationHelper";
import { IGenericResponse } from "../../interface/common";

// post faq 
export const postFAQToDb = async (data: Faq): Promise<Faq> => {
  const result = prisma.faq.create({
    data,
  });
  return result;
};

// get all faq
export const getAllFaqFromDB = async (
  options: IPaginationOptions
): Promise<IGenericResponse<Faq[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.faq.findMany({
    take: limit,
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });

  const total: number = await prisma.faq.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

// get single service
export const getSingleFaqService = async (id: string) => {

  const service = await prisma.faq.findUnique({
    where: {
      id,
    },
    
  });

  if (!service) {
    return null;
  }

  return service;
};

// update faq in db
export const updateBFaqInDB = async (
  id: string,
  payload: Partial<Faq>
) => {
  const result = await prisma.faq.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

// delete blog 
export const deleteFaqFromDB = async (id: string) => {
  const result = await prisma.faq.delete({
    where: {
      id,
    },
  });
  return result;
};

