"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImSpinner8 } from "react-icons/im";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import GithubForm from "@/components/auth/github-form";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { checkUserExistByEmail } from "@/app/acitons/auth";

const formValue = z.object({
  email: z.string().email({ message: "请输入正确的邮箱格式" }),
});

type formValueType = z.infer<typeof formValue>;

const RegisterStep1Form = () => {
  const router = useRouter();
  const form = useForm<formValueType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(formValue),
  });
  const onSubmit = async (value: formValueType) => {
    const userExist = await checkUserExistByEmail(value.email);

    if (userExist) {
      return toast({
        title: "用户已存在",
        description: "该用户已经注册",
      });
    }

    router.push(`/register/2/${value.email}`);
  };

  return (
    <div className={"relative space-y-3"}>
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

          <Button
            className={"w-full gap-2"}
            disabled={form.formState.isSubmitting}
            type={"submit"}
          >
            {form.formState.isSubmitting && (
              <ImSpinner8 className={"animate-spin"} />
            )}
            Sign Up with Email
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

export default RegisterStep1Form;
