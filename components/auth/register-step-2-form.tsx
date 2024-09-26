"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImSpinner8 } from "react-icons/im";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RegisterSchema, RegisterSchemaType } from "@/config/definetions";
import { signUp } from "@/app/acitons/auth";

interface RegisterStep2FormProps {
  email: string;
}

const RegisterStep2Form = ({ email }: RegisterStep2FormProps) => {
  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: email,
      password: "",
    },
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (value: RegisterSchemaType) => {
    try {
      const res = await signUp(value);

      return res.status;
    } catch (e) {
      return e;
    }
  };

  return (
    <div className={"w-full"}>
      <Form {...form}>
        <form
          className={"flex flex-col gap-4"}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"text-muted-foreground"}>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled
                    autoComplete={"email"}
                    value={email}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    autoComplete={"name"}
                    placeholder={"Username"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"password"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete={"new-password"}
                    placeholder={"Password"}
                    type={"password"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Link
            className={"self-end text-xs text-muted-foreground"}
            href={"/login"}
          >
            Already have an account
          </Link>

          <Button
            className={"mt-2 gap-2"}
            disabled={form.formState.isSubmitting}
            type={"submit"}
          >
            {form.formState.isSubmitting ? (
              <>
                <ImSpinner8 className={"animate-spin"} />
                <span>Sign Upping...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterStep2Form;
