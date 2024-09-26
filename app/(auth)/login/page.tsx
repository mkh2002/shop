import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { LoginForm } from "@/components/auth/login-form";

const Login = () => {
  return (
    <div className={"flex flex-col items-center p-10"}>
      <Link
        className={cn(buttonVariants({ variant: "ghost" }), "self-end")}
        href={"/register/1"}
      >
        Sign Up
      </Link>
      <div className={"my-auto w-full space-y-8 md:block md:max-w-xs"}>
        <div className={"flex flex-col justify-center gap-3 md:items-center"}>
          <h1 className={"text-2xl font-semibold"}>Welcome Back</h1>
          <small className={"text-xs text-muted-foreground"}>
            Enter your email to login this client
          </small>
        </div>

        <LoginForm />
        <p className={"px-2 text-center text-sm text-muted-foreground"}>
          By clicking to continue, you agree to the terms of service and privacy
          policy
        </p>
      </div>
    </div>
  );
};

export default Login;
