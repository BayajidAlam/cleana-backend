import { MyCart } from "@prisma/client";
import prisma from "../../../shared/prisma";

const addToCart = async (data: MyCart): Promise<MyCart> => {

  const result = prisma.myCart.create({
    data,
    include: {
      User: true,
      service: true,
    },
  });
  return result;
};

const getMyCartByUserId = async (id: string) => {
  
  const result = await prisma.myCart.findMany({
    where: {
      userId: id,
    },
    include: {
      service: true,
      User: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const deleteCart = async (id: string) => {
  
  const cartItem = await prisma.myCart.findUnique({
    where: {
      id,
    },
  });

  if (!cartItem) {
    throw new Error("CartItem not found with the specified ID");
  }

  const result = await prisma.myCart.delete({
    where: {
      id,
    },
  });
  return result;
};


export const MyCartService = {
  addToCart,
  deleteCart,
  getMyCartByUserId
};
