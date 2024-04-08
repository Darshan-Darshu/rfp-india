"use client";

import { ColumnDef } from "@tanstack/react-table";
import EditDialog from "../EditDialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Inventory = {
  _id?: string;
  sku_no: number;
  description: string;
  units: number;
  allocate: number;
  err?: string;
};

export const columns: ColumnDef<Inventory>[] = [
  {
    accessorKey: "index",
    header: () => <div className='w-1'>Index</div>,
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "sku_no",
    header: "SKU No",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "units",
    header: "Unit",
  },
  {
    accessorKey: "allocate",
    header: "To Allocate",
  },
  {
    accessorKey: "edit",
    header: () => "Edit",
    cell: ({ row }) => {
      return <EditDialog id={row.original?._id} />;
    },
  },
];
