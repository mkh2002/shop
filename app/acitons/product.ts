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

    revalidatePath("/"); // 只在创建操作时重新验证根路径

    return { status: true, message: "Product created successfully" };
  } catch (e: any) {
    return { status: false, message: e.message };
  }
};

export const deleteProductById = async (id: string) => {
  try {
    await db.product.delete({
      where: { id },
    });

    revalidatePath("/");

    return { status: true, message: "Product deleted successfully" };
  } catch (e: any) {
    return { status: false, message: e.message };
  }
};

export const updateProduct = async (
  id: string,
  data: ProductTypeWithoutCategory,
) => {
  try {
    await db.product.update({
      where: { id },
      data,
    });

    revalidatePath("/");

    return { status: true, message: "Product updated successfully" };
  } catch (e: any) {
    return { status: false, message: e.message };
  }
};

export const getAllProducts = async () => {
  try {
    const data = await db.product.findMany({
      include: { category: true },
    });

    return data;
  } catch (e: any) {
    return { status: false, message: e.message };
  }
};

export const getProductsByCategory = async (categoryId: string[]) => {
  try {
    const data = await db.product.findMany({
      where: categoryId.length > 0 ? { categoryId: { in: categoryId } } : {},
      include: { category: true },
    });

    return data;
  } catch (e: any) {
    return { status: false, message: e.message };
  }
};

export const getTopProducts = async () => {
  try {
    const data = await db.product.findMany({
      include: { category: true },
      take: 8,
    });

    return data;
  } catch (e: any) {
    return { status: false, message: e.message };
  }
};

export const getProductById = async (id: string) => {
  try {
    const data = await db.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!data) {
      return { status: false, message: "Product not found" };
    }

    return { status: true, data };
  } catch (e: any) {
    return { status: false, message: e.message };
  }
};
