import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function SignUpProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress;

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
    return (
      <p className='text-center'>
        User are not allowed this page, you are signed up
      </p>
    );
  }

  return <div>{children}</div>;
}

export default SignUpProvider;
