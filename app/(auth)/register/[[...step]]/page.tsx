import React from "react";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import RegisterStep1Form from "@/components/auth/register-step-1-form";
import RegisterStep2Form from "@/components/auth/register-step-2-form";

const Register = ({ params }: { params: { step: string } }) => {
  const step = parseInt(params.step);
  const email = decodeURIComponent(params.step[1]).split(" ").join();

  if (step === 1) {
    return (
      <div className={"flex flex-col items-center p-10"}>
        <Link
          className={cn(buttonVariants({ variant: "ghost" }), "self-end")}
          href={"/login"}
        >
          Login
        </Link>

        <div className={"my-auto w-full space-y-8 md:max-w-xs"}>
          <div className={"flex flex-col gap-3 md:items-center"}>
            <h1 className={"text-2xl font-semibold"}>Create an account</h1>
            <small className={"text-xs text-muted-foreground"}>
              Enter your email to create an account
            </small>
          </div>
          <RegisterStep1Form />
          <p className={"px-2 text-center text-sm text-muted-foreground"}>
            By clicking to continue, you agree to the terms of service and
            privacy policy
          </p>
        </div>
      </div>
    );
  } else if (step === 2 && email) {
    return (
      <div className={"flex flex-col items-center p-10"}>
        <Link
          className={cn(buttonVariants({ variant: "ghost" }), "gap-2 self-end")}
          href={"/register/1"}
        >
          <FaAngleLeft />
          Step 1
        </Link>

        <div className={"my-auto w-full space-y-8 md:max-w-xs"}>
          <div className={"flex flex-col gap-3 md:items-center"}>
            <h1 className={"text-2xl font-semibold"}>Step {step} of 2</h1>
            <p className={"text-xs text-muted-foreground"}>
              This is the final step to create an account
            </p>
          </div>
          <div className={"flex flex-col items-center gap-3"} />
          <RegisterStep2Form email={email} />
        </div>
      </div>
    );
  }
};

export default Register;
