"use server";
import { AddCategoryType } from "@/config/definetions";
import { db } from "@/prisma/db";

const getAllCategory = async () => {
  const data = await db.category.findMany();

  return data;
};

const getCategoryById = async (id: string) => {
  const data = await db.category.findUnique({
    where: {
      id,
    },
  });

  return data;
};

const createCategory = async (data: AddCategoryType) => {
  try {
    await db.category.create({
      data,
    });

    return { status: true, message: "Category created successfully" };
  } catch (error: any) {
    return { status: false, message: error.message };
  }
};

const updateCategory = async (id: string, data: AddCategoryType) => {
  try {
    await db.category.update({
      where: {
        id,
      },
      data,
    });

    return { status: true, message: "Category updated successfully" };
  } catch (error: any) {
    throw error;
  }
};

const deleteCategory = async (id: string) => {
  try {
    await db.category.delete({
      where: {
        id,
      },
    });

    return { status: true, message: "Category deleted successfully" };
  } catch (error: any) {
    throw error;
  }
};

export {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
