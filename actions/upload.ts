"use server";

import { Inventory } from "@/components/table/columns";
import { revalidateTag } from "next/cache";

export const uploadFileToDB = async (
  formData: FormData,
  userEmail: string,
) => {
  if (!userEmail) return;

  try {
    const response = await fetch(
      `${process.env.API_URL}/inventory?email=${userEmail}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();
    console.log(data);
    if (!data.err) {
      revalidateTag("collection");
    }
    return data;
  } catch (err) {
    console.log(err);
    alert(
      "something went wrong can please check the developer console",
    );
  }
};

export const updateInventory = async (
  data: Inventory,
  id: string,
) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/inventory/${id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const data1 = await response.json();
    revalidateTag("collection");
  } catch (err) {
    console.log(err);
    alert(
      "something went wrong can please check the developer console",
    );
  }
};
