import { JwtPayload, Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

const decodedToken = (token: string) => {
  return jwtDecode(token);
};

export const jwtHelpers = {
  createToken,
  verifyToken,
  decodedToken
};