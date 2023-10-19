import { MyCart } from "@prisma/client";
import prisma from "../../shared/prisma";

export const addCartToDB = async (data: MyCart): Promise<MyCart> => {
  const result = prisma.myCart.create({
    data,
    include: {
      User: true,
      service: true,
    },
  });
  return result;
};

export const getMyCartByUserIdFromDB = async (id: string) => {
  
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

export const deleteCartFromDB = async (id: string) => {
  console.log(id);
  const cartItem = await prisma.myCart.findUnique({
    where: {
      id,
    },
  });
  console.log(cartItem);
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
