import NonUserMain from "@/components/NonUserMain";
import UserMain from "@/components/UserMain";
import { Inventory } from "@/components/table/columns";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  const userEmail = user?.emailAddresses?.[0].emailAddress;

  async function getUserEmail() {
    if (!userEmail) return;
    const response = await fetch(
      `${process.env.API_URL}/users/${userEmail}`,
    );

    const data = await response.json();
    return data;
  }

  const loggedUser = await getUserEmail();

  const getInventory = async (): Promise<Inventory[]> => {
    const response = await fetch(
      `${process.env.API_URL}/inventory//email/${userEmail}`,
      { cache: "no-cache", next: { tags: ["collection"] } },
    );

    const data = await response.json();
    return data;
  };

  const getAllInventory = async (): Promise<
    Inventory[] | null
  > => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/inventory`,
      );

      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  let inventory: Inventory[] | Error | null = null;

  if (loggedUser?.role === "dist") {
    inventory = await getInventory();
  } else if (loggedUser?.role === "branch") {
    inventory = await getAllInventory();
  }

  function arrSort(arr: Inventory[]) {
    // arr.sort((a, b) => a - b);
    arr.reverse();
    return arr;
  }
  const reverse = inventory && arrSort(inventory);

  return (
    <main className=''>
      {loggedUser?.role ? (
        <UserMain
          inventory={reverse}
          loggedUser={loggedUser}
        />
      ) : (
        <NonUserMain />
      )}
    </main>
  );
}
