"use client";
import React, { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { Row } from "@tanstack/react-table";
import { ImSpinner8 } from "react-icons/im";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface TableActionDeleteRowProps<TData> {
  row: Row<TData>;
  onDelete: (value: { id: string }) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TableActionDeleteRow = forwardRef<
  HTMLButtonElement,
  TableActionDeleteRowProps<any>
>(({ row, onDelete, open, onOpenChange }, ref) => {
  const form = useForm<{ id: string }>({
    defaultValues: {
      id: row.getValue("id"),
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button
          ref={ref} // 使用 ref
          className="w-full justify-start rounded-sm px-2 text-sm text-destructive"
          size="sm"
          variant="ghost"
        >
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {row.getValue("name")}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this row?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form id="form" onSubmit={form.handleSubmit(onDelete)}>
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            className="space-x-2"
            disabled={form.formState.isSubmitting}
            form="form"
            type="submit"
            variant="destructive"
          >
            {form.formState.isSubmitting ? (
              <>
                <ImSpinner8 className="size-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

TableActionDeleteRow.displayName = "TableActionDeleteRow";

export default TableActionDeleteRow;
