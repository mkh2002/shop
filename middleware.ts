import { NextRequest, NextResponse } from "next/server";

import { auth } from "./config/auth";

const publicRoutes = ["/login", "/register"];
const protectedRoutes = ["/admin"];

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

  if (isProtectedRoute && session?.user.role !== "ADMIN") {
    return NextResponse.redirect(
      new URL(`/redirect?role=${session?.user.role}`, req.nextUrl),
    );
  }
  if (
    isPublicRoute &&
    session?.user.role === "ADMIN" &&
    !req.nextUrl.pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
