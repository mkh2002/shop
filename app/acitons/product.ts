"use server";
import { revalidatePath } from "next/cache";

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
  } finally {
    revalidatePath("/");
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
  } finally {
    revalidatePath("/");
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
  } finally {
    revalidatePath("/");
  }
};

export const getAllProducts = async () => {
  const data = await db.product.findMany({
    include: {
      category: true,
    },
  });

  revalidatePath("/");

  return data;
};

export const getTopProducts = async () => {
  const data = await db.product.findMany({
    include: {
      category: true,
    },
    take: 8,
  });

  revalidatePath("/");

  return data;
};

export const getProductById = async (id: string) => {
  try {
    const data = await db.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });

    return { status: true, data };
  } catch (e: any) {
    return { status: false, message: "notFound" };
  } finally {
    revalidatePath("/");
  }
};
