"use client";

import { Inventory } from "./table/columns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { updateInventory } from "@/actions/upload";
import { useState } from "react";

type Props = {
  id: string;
  inventory: Inventory | null;
};

function EditModal({ inventory, id }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleUpdate = async (formData: FormData) => {
    const sku_no = formData.get("sku_no");
    const description = formData.get("description");
    const units = formData.get("unit");
    const allocate = formData.get("allocate");
    if (!sku_no && !description && !units && !allocate)
      return;

    const data = {
      sku_no: Number(sku_no) as number,
      description: description as string,
      units: Number(units) as number,
      allocate: Number(allocate) as number,
    };

    updateInventory(data, id)
      .then(() => {
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };
  console.log(loading);
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Pencil className='h-5 w-5 cursor-pointer' />
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Update</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view
            this.
          </DialogDescription>
        </DialogHeader>
        <form
          action={handleUpdate}
          className='flex flex-col space-y-4'
        >
          <div className='w-full space-y-2'>
            <Label
              htmlFor='sku_no'
              className=''
            >
              Sku No
            </Label>
            <Input
              id='sku_no'
              type='number'
              name='sku_no'
              defaultValue={inventory?.sku_no}
              required
            />
          </div>
          <div className='space-y-2 w-full'>
            <Label
              htmlFor='description'
              className=''
            >
              Description
            </Label>
            <Input
              id='description'
              name='description'
              defaultValue={inventory?.description}
              required
            />
          </div>
          <div className='flex space-x-6'>
            <div className='space-y-2 w-full'>
              <Label
                htmlFor='unit'
                className=''
              >
                Unit
              </Label>
              <Input
                id='unit'
                type='number'
                name='unit'
                defaultValue={inventory?.units}
                required
              />
            </div>
            <div className='space-y-2 w-full'>
              <Label
                htmlFor='allocate'
                className=''
              >
                Allocate
              </Label>
              <Input
                id='Allocate'
                type='number'
                name='allocate'
                defaultValue={inventory?.allocate}
                required
              />
            </div>
          </div>
          <Button
            type='submit'
            size='sm'
            className='px-3 w-24'
          >
            Update
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditModal;
