"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export const addUserSchema = z.object({
  name: z.string().min(3, { message: "username must to be long of 3 chars" }),
  email: z.string().email({ message: "invalid email format" }),
  password: z
    .string()
    .min(6, { message: "password must be long of 6 chars" })
    .regex(/[a-zA-Z0-9]{6,}/, {
      message: "password must contain numbers and letters",
    }),
  emailVerified: z.string().nullable(),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
});
export type addUserSchemaType = z.infer<typeof addUserSchema>;

const AddUserForm = ({
  onSubmit,
}: {
  onSubmit: (value: addUserSchemaType) => void;
}) => {
  const form = useForm<addUserSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      emailVerified: new Date().toISOString(),
      role: "USER",
    },
    resolver: zodResolver(addUserSchema),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className={"space-y-6 pt-4"}
            id={"form"}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex flex-col items-center justify-center space-y-2 md:mt-5">
                <Avatar className={"size-24"}>
                  <AvatarImage alt={"User avatar"} src={"/avatar.jpg"} />
                  <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-2 md:col-span-2">
                <FormField
                  control={form.control}
                  name={"name"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete={"off"} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={"role"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              {form.getValues("role")}
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                            <SelectItem value="USER">User</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name={"email"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete={"off"} />
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
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete={"off"} value={undefined} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <Button
          className={"w-full"}
          disabled={form.formState.isSubmitting}
          form={"form"}
        >
          {form.formState.isSubmitting ? (
            <div className={"space-x-2"}>
              <span>Saving...</span>
            </div>
          ) : (
            "Save Profile"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddUserForm;
