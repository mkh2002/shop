import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ImSpinner8 } from "react-icons/im";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { AddCategory, AddCategoryType } from "@/config/definetions";
import { updateCategory } from "@/app/acitons/category";
import { uploadFile } from "@/app/acitons/file";

interface EditCategoryFormProps<TData> {
  setOpen: (open: boolean) => void;
  row: Row<TData>;
}

const EditCategoryForm = <TData,>({
  row,
  setOpen,
}: EditCategoryFormProps<TData>) => {
  const form = useForm<AddCategoryType>({
    defaultValues: {
      name: row.getValue("name"),
      image: row.getValue("image"),
    },
    resolver: zodResolver(AddCategory),
  });
  const router = useRouter();

  const onSubmit = async (value: AddCategoryType) => {
    try {
      const res = await updateCategory(row.getValue("id"), value);

      if (res.status) {
        router.refresh();
        setOpen(false);
        toast({
          title: "Success",
          description: "Category updated successfully",
        });
      }
    } catch (e: any) {
      toast({
        title: "Error",
        description: "Error to update category",
        variant: "destructive",
      });
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        form.setValue("image", reader.result as string);
      };
      reader.readAsDataURL(file);

      try {
        const formData = new FormData();

        formData.append("file", file as Blob);
        formData.append("filename", `${form.getValues("name")}-${file.name}`);
        const res = await uploadFile(formData);

        if (res.status) {
          form.setValue("image", res.path);

          return toast({
            title: "Success",
            description: "Image uploaded successfully",
          });
        }
      } catch (e) {
        return toast({
          title: "Error to upload",
          description: "Error to upload image, try again",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Info</CardTitle>
        <CardDescription>
          Fill in the form below to add a edit category.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            className={"flex flex-col gap-3 md:flex-row"}
            id={"form"}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name={"id"}
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"image"}
              render={({ field }) => (
                <div>
                  <Label className={"cursor-pointer"} htmlFor={"upload-image"}>
                    <div
                      className={"relative mx-auto size-40  md:mx-0 md:size-20"}
                    >
                      <Image
                        fill
                        alt={"categoryImage"}
                        className={" rounded-md"}
                        sizes="auto"
                        src={field.value as string}
                      />
                    </div>
                    <input
                      accept="image/*"
                      className={"sr-only"}
                      id={"upload-image"}
                      type={"file"}
                      onChange={handleImageChange}
                    />
                  </Label>

                  <FormItem hidden>
                    <FormLabel>Picture</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete={"off"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => (
                <FormItem className={"md:flex-1"}>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete={"off"} />
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
          type={"submit"}
        >
          {form.formState.isSubmitting ? (
            <>
              <ImSpinner8 className={"size-4 animate-spin"} />
              <span className={"ml-2"}>Submitting</span>
            </>
          ) : (
            "Update Category"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditCategoryForm;
