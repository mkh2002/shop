"use client";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { RxCaretSort, RxUpload } from "react-icons/rx";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ImSpinner8 } from "react-icons/im";
import { useRouter } from "next/navigation";
import { CheckIcon } from "@radix-ui/react-icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  AddCategoryType,
  ProductSchema,
  ProductType,
} from "@/config/definetions";
import { createProduct } from "@/app/acitons/product";
import { getAllCategory } from "@/app/acitons/category";
import { uploadFile } from "@/app/acitons/file";
import { Textarea } from "@/components/ui/textarea";

interface AddProductFormProps {
  setOpen: (open: boolean) => void;
}

const AddProductForm = ({ setOpen }: AddProductFormProps) => {
  const [categories, setCategories] = React.useState<AddCategoryType[]>([]);
  const router = useRouter();
  const form = useForm<ProductType>({
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      image: "",
      description: "",
      categoryId: "",
    },
    resolver: zodResolver(ProductSchema),
  });

  const onSubmit = async (value: ProductType) => {
    try {
      const res = await createProduct(value);

      if (res.status) {
        router.refresh();
        setOpen(false);

        return toast({
          title: "Success",
          description: "Product updated successfully",
        });
      }
    } catch (e: any) {
      return toast({
        title: "Error",
        description: "Error to update product",
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

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategory();

      setCategories(res);
    };

    fetchCategories().then();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product detail</CardTitle>
        <CardDescription>Add a product</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            className={"flex flex-col gap-3"}
            id={"form"}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div
              className={
                "flex flex-col items-center gap-6 md:flex-row md:gap-3"
              }
            >
              <FormField
                control={form.control}
                name={"image"}
                render={({ field }) => (
                  <div>
                    <Label
                      className={"cursor-pointer"}
                      htmlFor={"upload-image"}
                    >
                      <div
                        className={
                          "relative mx-auto size-40 md:mx-0 md:size-20"
                        }
                      >
                        {field.value ? (
                          <Image
                            fill
                            priority
                            alt={"product"}
                            className={"rounded-lg"}
                            sizes={"auto"}
                            src={field.value}
                          />
                        ) : (
                          <div
                            className={
                              "flex size-full items-center justify-center gap-1 rounded-lg border-2 border-dashed text-muted-foreground"
                            }
                          >
                            <RxUpload className={"size-4"} />
                            <span className={"block md:hidden"}>Upload</span>
                          </div>
                        )}
                      </div>
                      <Input
                        accept="image/*"
                        className={"sr-only"}
                        id={"upload-image"}
                        type={"file"}
                        onChange={(e) => handleImageChange(e)}
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

              <div className={"w-full space-y-3"}>
                <FormField
                  control={form.control}
                  name={"name"}
                  render={({ field }) => (
                    <FormItem className={"flex-1"}>
                      <FormLabel className={"md:hidden"}>Name</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete={"off"}
                          {...field}
                          placeholder={"Name"}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"categoryId"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={"md:hidden"}>Category</FormLabel>
                      <FormControl>
                        <Input {...field} className={"sr-only"} />
                      </FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            className={
                              "w-full justify-between px-2 text-muted-foreground"
                            }
                            size={"lg"}
                            variant={"outline"}
                          >
                            <span>
                              {form.getValues("categoryId").length > 1
                                ? categories.find(
                                    (category) =>
                                      category.id ===
                                      form.getValues("categoryId"),
                                  )?.name
                                : "Select category"}
                            </span>
                            <RxCaretSort className={"size-4 "} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className={"z-[250] w-full p-0"}>
                          <Command className={"w-full"}>
                            <CommandInput placeholder={"search category"} />
                            <CommandList>
                              <CommandEmpty>No categories found</CommandEmpty>
                              {categories.map((category) => {
                                const isSelected = category.id === field.value;

                                return (
                                  <CommandItem
                                    key={category.id}
                                    onSelect={() =>
                                      form.setValue(
                                        "categoryId",
                                        category.id as string,
                                      )
                                    }
                                  >
                                    <div
                                      className={cn(
                                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                        isSelected
                                          ? "bg-primary text-primary-foreground"
                                          : "opacity-50 [&_svg]:invisible",
                                      )}
                                    >
                                      <CheckIcon className={cn("h-4 w-4")} />
                                    </div>
                                    <span>{category.name}</span>
                                  </CommandItem>
                                );
                              })}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name={"price"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete={"off"}
                      type={"number"}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"stock"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete={"off"}
                      type={"number"}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"description"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
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
          className={"w-full space-x-2"}
          disabled={form.formState.isSubmitting}
          form={"form"}
          type={"submit"}
        >
          {form.formState.isSubmitting ? (
            <>
              <ImSpinner8 className={"size-4 animate-spin"} />
              <span>Saving...</span>
            </>
          ) : (
            "Save"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddProductForm;
