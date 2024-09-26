"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { ImSpinner8 } from "react-icons/im";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import GithubForm from "@/components/auth/github-form";
import { toast } from "@/hooks/use-toast";
import { LoginSchema, LoginSchemaType } from "@/config/definetions";
import { checkUserExistByEmail } from "@/app/acitons/auth";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

type SubmitType = {
  email: string;
  password?: string;
};

export const LoginForm = () => {
  const [step, setStep] = useState(1);
  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (value: SubmitType) => {
    if (step === 1) {
      const userExist = await checkUserExistByEmail(value.email);

      if (!userExist) {
        return toast({
          title: "User not found",
          description: "Please enter a valid email",
          variant: "destructive",
        });
      }
      setStep(2);
    }

    if (step === 2) {
      try {
        await signIn("credentials", { ...value });
      } catch (e: any) {
        toast({
          title: "Sign In Failed",
          description: e.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className={"relative space-y-3 self-center"}>
      <Form {...form}>
        <form
          className={"flex flex-col gap-8 md:gap-3"}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoComplete={"email"}
                    placeholder={"Email"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {step === 2 && (
            <FormField
              control={form.control}
              name={"password"}
              render={({ field }) => (
                <FormItem>
                  <Input
                    placeholder={"Password"}
                    type={"password"}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button
            className={"gap-1"}
            disabled={form.formState.isSubmitting}
            type={"submit"}
          >
            {form.formState.isSubmitting && (
              <ImSpinner8 className={"animate-spin"} />
            )}
            Sign In with Email
          </Button>
        </form>
      </Form>
      <div className={"relative"}>
        <div className={"absolute inset-0 flex items-center"}>
          <span className={"w-full border-t"} />
        </div>
        <div
          className={
            "relative flex items-center justify-center text-xs uppercase"
          }
        >
          <span className={"bg-background px-2 text-muted-foreground"}>
            Or continue with
          </span>
        </div>
      </div>
      <GithubForm
        disabled={form.formState.isSubmitting}
        isPending={form.formState.isSubmitting}
      />
    </div>
  );
};
