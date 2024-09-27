"use server";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

import { db } from "@/prisma/db";
import { RegisterSchemaType } from "@/config/definetions";

export const checkUserExistByEmail = async (email: string) => {
  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  revalidatePath("/");

  return user;
};

export const signUp = async (value: RegisterSchemaType) => {
  const { name, email, password } = value;

  const existedUser = await checkUserExistByEmail(email);

  if (existedUser) {
    return { message: "User already exists", status: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { message: "User created", status: 200 };
  } catch (e: any) {
    return { e, status: 400 };
  } finally {
    revalidatePath("/");

    db.$disconnect();
  }
};
