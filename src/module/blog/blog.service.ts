import { BlogPost, Faq } from "@prisma/client";
import prisma from "../../shared/prisma";
import { IPaginationOptions } from "../../constants/pagination";
import { paginationHelpers } from "../../helpers/paginationHelper";
import { IGenericResponse } from "../../interface/common";


export const postBlogToDb = async (data: BlogPost): Promise<BlogPost> => {
  const result = prisma.blogPost.create({
    data,
  });
  return result;
};

export const postFAQToDb = async (data: Faq): Promise<Faq> => {
  const result = prisma.faq.create({
    data,
  });
  return result;
};

// get all post 
export const getAllBlogFromDB = async (
  options: IPaginationOptions
): Promise<IGenericResponse<BlogPost[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.blogPost.findMany({
    take: limit,
    skip,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {},
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

// get all post 
export const getAllFaqFromDB = async (
  options: IPaginationOptions
): Promise<IGenericResponse<Faq[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.faq.findMany({
    take: limit,
    skip,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {},
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


// export const getSingleServiceByCategoryIDFromDB = async (id: string) => {
//   const result = await prisma.services.findMany({
//     where: {
//       categoryId: id,
//     },
//   });
//   return result;
// };

// export const updateServiceFromDB = async (
//   id: string,
//   payload: Partial<Services>
// ) => {
//   const result = await prisma.services.update({
//     where: {
//       id,
//     },
//     data: payload,
//     include: {
//       category: true,
//     },
//   });
//   return result;
// };

// export const deleteServiceFromDB = async (id: string) => {
//   const deleteReview = await prisma.reviewAndRating.deleteMany({
//     where: {
//       servicesId: id,
//     },
//   });

//   const deleteBooking = await prisma.booking.deleteMany({
//     where: {
//       servicesId: id,
//     },
//   });
//   if (!!deleteReview || !!deleteBooking) {
//     const result = await prisma.services.delete({
//       where: {
//         id,
//       },
//     });
//     return result;
//   }
// };
// export const getSingleServiceService = async (id: string) => {
//   // Use Prisma's findUnique to retrieve a service by its id
//   const service = await prisma.services.findUnique({
//     where: {
//       id,
//     },
//   });

//   if (!service) {
//     return null;
//   }

//   // If the service exists, you can return it or perform any other actions
//   return service;
// };
