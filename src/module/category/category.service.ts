import { Category } from "@prisma/client";
import prisma from "../../shared/prisma";

const addCategory = async (data: Category): Promise<Category> => {
  const result = prisma.category.create({
    data,
  });
  return result;
};

const getAllCategory = async () => {
  const result = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

export const CategoryService = {
  addCategory,
  getAllCategory,
};
