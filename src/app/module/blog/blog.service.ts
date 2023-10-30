import { BlogPost, Faq } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../constants/pagination";
import { IGenericResponse } from "../../../interface/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";

// post blog
const createBlog = async (data: BlogPost): Promise<BlogPost> => {
  const result = prisma.blogPost.create({
    data,
  });
  return result;
};

// get all post
const getAllBlog = async (
  options: IPaginationOptions
): Promise<IGenericResponse<BlogPost[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.blogPost.findMany({
    take: limit,
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });

  const total: number = await prisma.blogPost.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

// get single blog
const getSingleBlog = async (id: string) => {
  const service = await prisma.blogPost.findUnique({
    where: {
      id,
    },
  });

  if (!service) {
    return null;
  }

  return service;
};

// update blog in db
const updateBlog = async (id: string, payload: Partial<BlogPost>) => {
  const result = await prisma.blogPost.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

// delete blog
const deleteBlog = async (id: string) => {
  const result = await prisma.blogPost.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BlogService = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
