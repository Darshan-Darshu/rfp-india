import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

async function LoginPage() {
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

  const existingUser = await getUserEmail();

  if (existingUser) {
    redirect("/");
  }

  if (!existingUser) {
    redirect("/signup");
  }
  return (
    <div>
      <p>
        You are not registered yet, can you please
        <Link href='/signup'>signup here</Link>
      </p>
    </div>
  );
}

export default LoginPage;
