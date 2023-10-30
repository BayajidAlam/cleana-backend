import { User } from "@prisma/client";
import prisma from "../../shared/prisma";
import httpStatus from "http-status";
import { createToken } from "../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../config";

const signUpUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data: data,
  });
  return result;
};

const loginUser = async (payload: User) => {
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

export const AuthService = {
  signUpUser,
  loginUser,
};
