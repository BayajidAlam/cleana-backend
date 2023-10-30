import {  Faq } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../constants/pagination";
import { IGenericResponse } from "../../../interface/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
// post faq
const createFaq = async (data: Faq): Promise<Faq> => {

  const result = prisma.faq.create({
    data,
  });
  return result;
};

// get all faq
const getAllFaq = async (
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
const getSingleFaq = async (id: string) => {
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
const updateFaq = async (id: string, payload: Partial<Faq>) => {
  const result = await prisma.faq.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

// delete blog
const deleteFaq = async (id: string) => {
  const result = await prisma.faq.delete({
    where: {
      id,
    },
  });
  return result;
};

export const FaqService = {
  createFaq,
  getAllFaq,
  getSingleFaq,
  updateFaq,
  deleteFaq,
};
