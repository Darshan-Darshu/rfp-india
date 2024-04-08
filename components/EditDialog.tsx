import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Inventory } from "./table/columns";
import EditModal from "./EditModal";
import { useUser } from "@clerk/nextjs";

type Props = {
  id: string | undefined;
};

async function EditDialog({ id }: Props) {
  const { isLoaded, isSignedIn, user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  if (!id)
    return (
      <DialogClose asChild>
        <h1>Something went wrong!!</h1>
        <Button
          type='button'
          variant='secondary'
        >
          Close
        </Button>
      </DialogClose>
    );
  async function getUserEmail() {
    if (!userEmail) return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${userEmail}`,
    );

    const data = await response.json();
    return data;
  }

  const loggedUser = await getUserEmail();
  const getInventory =
    async (): Promise<Inventory | null> => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/inventory/${id}`,
          { cache: "no-cache" },
        );

        const data = await response.json();
        return data;
      } catch (err) {
        alert("Something went wrong");
        console.log(err);
        return null;
      }
    };

  const inventory = await getInventory();

  return (
    <>
      {loggedUser?.role === "dist" && (
        <EditModal
          inventory={inventory}
          id={id}
        />
      )}
      {loggedUser?.role === "branch" && <h1>Allocate</h1>}
    </>
  );
}

export default EditDialog;
