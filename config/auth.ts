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
        role: "USER",
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
    async authorize(credentials) {
      try {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!credentials?.email || !credentials?.password) {
          throw new Error("缺少邮箱或密码");
        }

        const user = await db.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) {
          throw new Error("邮箱未注册");
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          String(user.password),
        );

        if (!isPasswordValid) {
          throw new Error("密码错误");
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
        token.sub = user.id;
        token.role = user.role;
      } else if (!token.role) {
        const role = await getUserRole(token.sub as string);

        token.role = role || "USER";
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }

      return session;
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
