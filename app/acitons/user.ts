"use server";
import { db } from "@/prisma/db";
import { UserSchemaType } from "@/config/definetions";

import { addUserSchemaType } from "../(local)/admin/_components/accounts/add-user-form";

import { checkUserExistByEmail } from "./auth";

const deleteUser = async (id: string) => {
  try {
    await db.user.delete({
      where: {
        id,
      },
    });

    return { message: "Delete user success", status: false };
  } catch (e: any) {
    return { e, status: false };
  }
};

const addUser = async (data: addUserSchemaType) => {
  const existedUser = await checkUserExistByEmail(data.email);

  if (existedUser) {
    return { message: "Email is already taken", status: false };
  }

  try {
    await db.user.create({
      data: data,
    });
  } catch (e: any) {
    throw e;
  }

  return { message: "Create user success", status: 201 };
};

const getUser = async (id: string) => {
  try {
    const user = await db.user.delete({
      where: {
        id,
      },
    });

    return { data: user, status: true };
  } catch (e: any) {
    return { message: e, status: false };
  }
};

const updateUser = async (data: UserSchemaType) => {
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(
      ([key, value]) => key !== "id" && value !== null,
    ),
  );

  try {
    await db.user.update({
      where: {
        id: data.id,
      },
      data: { updatedAt: new Date().toISOString(), ...filteredData },
    });

    return { message: "Update user success", status: true };
  } catch (e: any) {
    return { message: e, status: false };
  }
};

const getAllUsers = async () => {
  const data = await db.user.findMany();

  return data;
};

export { getUser, addUser, deleteUser, updateUser, getAllUsers };
