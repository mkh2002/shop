"use server";
import { db } from "@/prisma/db";
import { ProductType } from "@/config/definetions";

type ProductTypeWithoutCategory = Omit<ProductType, "category">;
export const createProduct = async (data: ProductTypeWithoutCategory) => {
  try {
    await db.product.create({
      data: data,
    });

    return { status: true, message: "Product created successfully" };
  } catch (e: any) {
    throw e;
  }
};

export const deleteProductById = async (id: string) => {
  try {
    await db.product.delete({
      where: {
        id,
      },
    });

    return { status: true, message: "Product deleted successfully" };
  } catch (e: any) {
    throw e;
  }
};

export const updateProduct = async (
  id: string,
  data: ProductTypeWithoutCategory,
) => {
  try {
    await db.product.update({
      where: {
        id,
      },
      data,
    });

    return { status: true, message: "Product updated successfully" };
  } catch (e: any) {
    throw e;
  }
};

export const getAllProducts = async () => {
  const data = await db.product.findMany({
    include: {
      category: true,
    },
  });

  return data;
};
