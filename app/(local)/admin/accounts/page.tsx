import React from "react";

import Context from "@/app/(local)/admin/_components/accounts/context";
import { getAllUsers } from "@/app/acitons/user";

const AccountsPage = async () => {
  const data = await getAllUsers();

  return (
    <div className={"relative size-full py-10"}>
      <div>
        <Context data={data} />
      </div>
    </div>
  );
};

export default AccountsPage;
