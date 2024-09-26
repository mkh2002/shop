import type { Provider } from "next-auth/providers";

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { db } from "@/prisma/db";

import authConfig from "./auth.config";

const getUserRole = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      role: true,
    },
  });

  return user?.role;
};

const providers: Provider[] = [
  GitHub({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET,
    allowDangerousEmailAccountLinking: true,
    async profile(profile) {
      return {
        name: profile.login,
        image: profile.avatar_url,
        email: profile.email,
      };
    },
  }),

  CredentialsProvider({
    id: "credentials",
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials: any) {
      try {
        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return new Error("邮箱未注册");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          String(user.password),
        );

        if (!isPasswordValid) {
          return new Error("密码错误");
        }

        return user;
      } catch (e: any) {
        throw new Error(e.message);
      } finally {
        db.$disconnect();
      }
    },
  }),
];

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,

  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userId = token.sub as string;

        token.role = getUserRole(userId);
      }

      return token;
    },
  },
  events: {
    linkAccount: async ({ user }) => {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });

      return;
    },
  },
});
