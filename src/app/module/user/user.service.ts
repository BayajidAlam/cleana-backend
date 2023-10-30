import { Prisma } from "@prisma/client";
import { userFilterAbleField } from "./user.constant";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../constants/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";

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

const getAllUser = async (filters: any, options: IPaginationOptions) => {
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

const deleteSingleUser = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    await prisma.$transaction([
      prisma.feedback.deleteMany({
        where: {
          userId: id,
        },
      }),
      prisma.booking.deleteMany({
        where: {
          userId: id,
        },
      }),
      prisma.user.delete({
        where: {
          id: id,
        },
      }),
    ]);

    return {
      success: true,
      message: "User and related feedback and booking records deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return  {
      success: false,
      message:
        "An error occurred while deleting the user and related records",
    };
  }
};

export const UserService = {
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteSingleUser,
};
