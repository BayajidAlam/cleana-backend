import { Prisma, User } from "@prisma/client";
import prisma from "../../shared/prisma";
import httpStatus from "http-status";
import { createToken } from "../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import { paginationHelpers } from "../../helpers/paginationHelper";
import { IPaginationOptions } from "../../constants/pagination";
import { userFilterAbleField } from "./user.constant";

export const signUpUserTODB = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data: data,
  });
  return result;
};

export const loginUserToDB = async (payload: User) => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findFirstOrThrow({
    where: {
      email: email,
      password: password,
    },
  });

  if (!isUserExist) {
    httpStatus.NOT_FOUND, "User does not exist";
  } else {
    const { id: userId, role } = isUserExist;
    const accessToken: any | undefined = createToken(
      { userId, role },
      config.jwt.access_secret as Secret,
      config.jwt.access_expires_in as string
    );

    const refreshToken: any | undefined = createToken(
      { userId, role },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    );

    return {
      accessToken,
      refreshToken,
    };
  }
};

export const getSingleUserById = async (id: any) => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

export const updateUserRole = async (id: any, payload: object) => {
  const result = await prisma.user.update({
    where: { id },
    data: payload,
  });
  return result;
};

export const getAllUsersFromDB = async (
  filters: any,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  console.log(searchTerm);
  const andConditons = [];

  // Check if searchTerm is for role filtering
  if (searchTerm && userFilterAbleField.includes(searchTerm.toLowerCase())) {
    andConditons.push({
      [searchTerm.toLowerCase()]: {
        equals: true, // You can modify this based on your Prisma schema
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

  /**
   * person = { name: 'fahim' }
   * name = person[name]
   *
   */

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

export const deleteSingleUserFromDb = async (id: string) => {
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
