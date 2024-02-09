import { Prisma, Services } from "@prisma/client";
import {
  IservicesFilterableFieldsProps,
  servicesSearchableFields,
} from "./services.constant";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../constants/pagination";
import { IGenericResponse } from "../../../interface/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const addService = async (data: Services): Promise<Services> => {

  const result = prisma.services.create({
    data,
  });
  return result;
};

const getAllService = async (
  filters: IservicesFilterableFieldsProps,
  options: IPaginationOptions
): Promise<IGenericResponse<Services[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const { search, ...filtersData } = filters;
  console.log(filtersData);
  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: servicesSearchableFields.map((field: any) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map((key) => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.ServicesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  if (filtersData?.title) {
    const result = await prisma.services.findMany({
      where: {
        category: {
          title: filtersData.title,
        },
      },
      include: {
        category: true,
      },
      take: limit,
      skip,
      orderBy: {
        createdAt: "desc",
      },
    });
    const total: number = await prisma.services.count({
      where: {
        category: {
          title: filtersData.title,
        },
      },
    });
    return {
      meta: {
        total,
        page,
        limit,
      },
      data: result,
    };
  } else {
    const result = await prisma.services.findMany({
      where: whereConditions,
      include: {
        category: true,
      },
      take: limit,
      skip,
      orderBy: {
        createdAt: "desc",
      },
    });
    const total: number = await prisma.services.count({
      where: whereConditions,
    });
    return {
      meta: {
        total,
        page,
        limit,
      },
      data: result,
    };
  }
};

const getAllNewService = async () => {

  const result = await prisma.services.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const getSingleServiceByCategoryID = async (id: string) => {
  
  const result = await prisma.services.findMany({
    where: {
      categoryId: id,
    },
  });
  return result;
};

const updateService = async (
  id: string,
  payload: Partial<Services>
) => {

  const result = await prisma.services.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

const deleteService = async (id: string) => {

  const deleteReview = await prisma.reviewAndRating.deleteMany({
    where: {
      servicesId: id,
    },
  });

  const deleteBooking = await prisma.booking.deleteMany({
    where: {
      servicesId: id,
    },
  });

  if (!!deleteReview || !!deleteBooking) {
    const result = await prisma.services.delete({
      where: {
        id,
      },
    });
    return result;
  }
};
const getSingleService = async (id: string) => {

  const service = await prisma.services.findUnique({
    where: {
      id,
    },
  });

  if (!service) {
    return null;
  }


  return service;
};


export const Service = {
  addService,
  getAllService,
  getAllNewService ,
  getSingleServiceByCategoryID,
  updateService,
  deleteService,
  getSingleService
};
