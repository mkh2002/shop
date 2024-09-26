import { Row } from "@tanstack/react-table";
import { RxDotsHorizontal } from "react-icons/rx";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { AddCategory, AddCategoryType } from "@/config/definetions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import TableDialog from "@/app/(local)/admin/_components/table/table-dialog";
import EditCategoryForm from "@/app/(local)/admin/_components/categories/edit-category-form";
import TableActionDeleteRow from "@/app/(local)/admin/_components/table/table-action-delete-row";
import { createCategory, deleteCategory } from "@/app/acitons/category";

interface TableRowActionsProps {
  row: Row<AddCategoryType>;
}
const TableRowActions = ({ row }: TableRowActionsProps) => {
  const category = AddCategory.parse(row.original);
  const [editOpen, setEditOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleCopy = () => {
    const accountString = JSON.stringify(category, null, 2);

    navigator.clipboard.writeText(accountString).then((r) => r);
  };

  const deleteCategoryById = async (value: { id: string }) => {
    const { id } = value;

    try {
      const res = await deleteCategory(id);

      if (res.status) {
        router.refresh();

        return toast({
          title: "Success",
          description: "Category deleted successfully",
          action: (
            <ToastAction
              altText={"Goto delete user undo"}
              onClick={() => handleUndo(category)}
            >
              Undo
            </ToastAction>
          ),
        });
      }
    } catch (e: any) {
      return toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleUndo = async (account: AddCategoryType) => {
    await createCategory(account);

    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={"flex size-8 p-0 data-[state=open]:bg-muted"}
          variant={"ghost"}
        >
          <RxDotsHorizontal className={"size-4"} />
          <span className={"sr-only"}>Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={"end"}>
        <DropdownMenuItem asChild>
          <TableDialog
            description={
              "Make changes to your profile here. Click save when you're done."
            }
            open={editOpen}
            setOpen={setEditOpen}
            title={`Edit Category ${category.name}`}
            triggerText={"Edit"}
          >
            <EditCategoryForm row={row} setOpen={setEditOpen} />
          </TableDialog>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopy}>Make a copy</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className={"text-destructive"} />
        <TableActionDeleteRow
          open={open}
          row={row}
          onDelete={deleteCategoryById}
          onOpenChange={setOpen}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableRowActions;
