import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // 自定义的 id 属性
      role: string; // 确保添加 role 属性
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string; // 确保添加 role 属性
  }

  // 如果需要添加 AdapterUser 类型的扩展
  interface AdapterUser extends DefaultAdapterUser {
    role: string; // 添加 role 属性
  }
}
interface User extends DefaultUser {
  role: string; // 确保 role 字段在类型定义中存在
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    // Additional properties here:
    role?: string;
  }
}
