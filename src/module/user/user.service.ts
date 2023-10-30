import { Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";
import { paginationHelpers } from "../../helpers/paginationHelper";
import { IPaginationOptions } from "../../constants/pagination";
import { userFilterAbleField } from "./user.constant";


const getSingleUser = async (id: any) => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const updateUserRole = async (id: any, payload: object) => {
  const result = await prisma.user.update({
    where: { id },
    data: payload,
  });
  return result;
};

const getAllUser = async (
  filters: any,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  console.log(searchTerm);
  const andConditons = [];

  
  if (searchTerm && userFilterAbleField.includes(searchTerm.toLowerCase())) {
    andConditons.push({
      [searchTerm.toLowerCase()]: {
        equals: true, 
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditons.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.UserWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.user.findMany({
    where: whereConditons,
    skip,
    take: limit,
  });

  const total = await prisma.user.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const deleteSingleUserFromDb = async (id: string) => {
  console.log(id, "id");
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (result) {
    const deleteResult = await prisma.user.delete({
      where: {
        id,
      },
    });
    return deleteResult;
  } else {
    return null;
  }
};


export const UserService = {
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteSingleUserFromDb
};
