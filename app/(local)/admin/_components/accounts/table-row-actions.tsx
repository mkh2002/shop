import { Row } from "@tanstack/react-table";
import { RxDotsHorizontal } from "react-icons/rx";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
import EditUserForm from "@/app/(local)/admin/_components/accounts/edit-user-form";
import TableActionDeleteRow from "@/app/(local)/admin/_components/table/table-action-delete-row";
import { UserSchema, UserSchemaType } from "@/config/definetions";
import { addUser, deleteUser, updateUser } from "@/app/acitons/user";

export interface TableRowActionsProps {
  row: Row<any>;
}

const TableRowActions = ({ row }: TableRowActionsProps) => {
  const account = UserSchema.parse(row.original);
  const [openEdit, setOpenEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleCopy = () => {
    const accountString = JSON.stringify(account, null, 2);

    navigator.clipboard.writeText(accountString).then((r) => r);
  };

  const handleUndo = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, password, emailVerified, ...data } = account;

      await addUser({
        password: password as string,
        emailVerified: emailVerified.toISOString(),
        ...data,
      });
      router.refresh();
    } catch (e: any) {
      return toast({
        title: "Error",
        description: e.message,
        variant: "destructive",
      });
    }
  };
  const handleDelete = async (value: { id: string }) => {
    const { id } = value;

    try {
      await deleteUser(id);
      router.refresh();
      setOpen(false);

      return toast({
        title: "Success",
        description: "User deleted successfully",
        action: (
          <ToastAction altText={"Undo"} onClick={handleUndo}>
            Undo
          </ToastAction>
        ),
      });
    } catch (e: any) {
      return toast({
        title: "Error",
        description: e.message,
        variant: "destructive",
      });
    }
  };

  const handleUserChange = async (value: UserSchemaType) => {
    try {
      await updateUser(value);
      setOpenEdit(false);
      router.refresh();

      return toast({
        title: "Success",
        description: "Account updated successfully",
      });
    } catch (e) {
      return toast({
        title: "Error",
        description: "Error to update account",
      });
    }
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
            open={openEdit}
            setOpen={setOpenEdit}
            title={`Edit User ${account.name}`}
            triggerText={"Edit"}
          >
            <EditUserForm props={account} onSubmit={handleUserChange} />
          </TableDialog>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopy}>Make a copy</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <TableActionDeleteRow
            open={open}
            row={row}
            onDelete={handleDelete}
            onOpenChange={setOpen}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableRowActions;
