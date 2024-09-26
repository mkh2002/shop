"use client";

import { SessionProvider as AuthProvider } from "next-auth/react";
import React from "react";

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <AuthProvider>{children}</AuthProvider>;
};
