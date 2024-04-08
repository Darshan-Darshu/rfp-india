import React from "react";
import Dropzone from "./Dropzone";
import InventoryCollection from "./InventoryCollection";
import { Inventory } from "./table/columns";
import { User } from "@/typings";

type Props = {
  inventory: Inventory[] | null | undefined;
  loggedUser: User;
};

function UserMain({ inventory, loggedUser }: Props) {
  let userRole;

  if (loggedUser?.role === "dist") userRole = "distributor";
  if (loggedUser?.role === "branch") userRole = "branch";
  if (loggedUser?.role === "store") userRole = "store";

  return (
    <div>
      {loggedUser?.role === "dist" && <Dropzone />}
      {loggedUser?.role === "branch" && (
        <div className='w-[98%] h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center bg-gray-200 mx-4 mb-6'></div>
      )}
      {userRole && (
        <h1 className='text-gray-600 text-lg capitalize mx-4'>
          {userRole}
        </h1>
      )}
      <InventoryCollection inventory={inventory} />
    </div>
  );
}

export default UserMain;
