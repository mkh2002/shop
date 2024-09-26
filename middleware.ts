import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import authConfig from "@/config/auth.config";

const { auth } = NextAuth(authConfig);

const publicRoutes = ["/login", "/register"];
const protectedRoutes = ["/admin"];

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if (isPublicRoute && session && !req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
