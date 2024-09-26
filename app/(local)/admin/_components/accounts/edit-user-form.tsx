"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RxUpload } from "react-icons/rx";
import { ImSpinner8 } from "react-icons/im";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { UserSchema, UserSchemaType } from "@/config/definetions";
import { uploadFile } from "@/app/acitons/file";
import { toast } from "@/hooks/use-toast";

const EditUserForm = ({
  props,
  onSubmit,
}: {
  props: UserSchemaType;
  onSubmit: (value: UserSchemaType) => void;
}) => {
  const [avatar, setAvatar] = useState(props.image);
  const form = useForm<UserSchemaType>({
    defaultValues: {
      ...props,
      password: undefined,
    },
    resolver: zodResolver(UserSchema),
  });

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);

      try {
        const formData = new FormData();

        formData.append("file", file as Blob);
        formData.append("filename", `${form.getValues("id")}-${file.name}`);
        const res = await uploadFile(formData);

        if (res.status) {
          form.setValue("image", res.path);

          return toast({
            title: "Success",
            description: "Image uploaded successfully",
          });
        }

        return toast({
          title: "Error to upload",
          description: "Error to upload image, try again",
        });
      } catch (e) {
        return toast({
          title: "Error to upload",
          description: "Error to upload image, try again",
        });
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form
            className={"space-y-6 pt-4"}
            id={"form"}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex flex-col items-center justify-end space-y-2">
                <Avatar className={"size-24"}>
                  <AvatarImage alt={"User avatar"} src={avatar} />
                  <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
                <Label className={"cursor-pointer"} htmlFor={"avatar-upload"}>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground hover:text-primary">
                    <RxUpload className={"size-3"} />
                    <span>Upload</span>
                  </div>
                  <Input
                    hidden
                    accept="image/*"
                    className={"sr-only"}
                    id={"avatar-upload"}
                    name={"avatar"}
                    type={"file"}
                    onChange={handleAvatarChange}
                  />
                </Label>
              </div>

              <FormField
                control={form.control}
                name={"image"}
                render={({ field }) => (
                  <FormItem hidden>
                    <FormControl>
                      <Input {...field} hidden />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

      <CardFooter className={"mt-6"}>
        <Button
          className={"w-full space-x-2"}
          disabled={form.formState.isSubmitting}
          form={"form"}
          type={"submit"}
        >
          {form.formState.isSubmitting ? (
            <>
              <ImSpinner8 className={"size-4 animate-spin"} />
              <span>Saving</span>
            </>
          ) : (
            "Save change"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditUserForm;
