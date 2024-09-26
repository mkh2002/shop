import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(3, { message: "用户名至少3位" }),
  email: z.string().email({ message: "错误的邮箱格式" }),
  password: z
    .string()
    .min(6, { message: "密码长度必须大于6位" })
    .regex(/[a-zA-Z0-9]{6,}/, {
      message: "密码必须包含数字和字母",
    }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email({ message: "错误的邮箱格式" }),
  password: z.string(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email({ message: "错误的邮箱格式" }),
  image: z.string().optional(),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
  password: z
    .string()
    .min(6, { message: "密码长度必须大于6位" })
    .regex(/[a-zA-Z0-9]{6,}/, {
      message: "密码必须包含数字和字母",
    })
    .optional()
    .nullable(),
  emailVerified: z.date(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;

export const AddCategory = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "分类名称不能为空" }),
  image: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type AddCategoryType = z.infer<typeof AddCategory>;

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "产品名称不能为空" }),
  description: z.string().min(1, { message: "产品描述不能为空" }),
  price: z.number().min(1, { message: "产品价格不能为空" }),
  stock: z.number().min(1, { message: "产品库存不能为空" }),
  categoryId: z.string().min(1, { message: "请选择产品分类" }),
  category: AddCategory.optional(),
  image: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type ProductType = z.infer<typeof ProductSchema>;
