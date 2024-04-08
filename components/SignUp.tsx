"use client";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function SignUp() {
  const [role, setRole] = useState("");
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const userFirstname = user?.firstName
    ? user.firstName
    : "";
  const userlastname = user?.fullName
    ? user?.fullName?.split(" ")?.[1]
    : "";

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!role) {
      alert("please select role");
      return;
    }

    const userData = {
      email: userEmail,
      firstName: userFirstname,
      lastName: userlastname,
      role,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
      );

      const data = await response.json();
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='flex justify-center items-center h-[70vh] px-4'>
      <form
        onSubmit={onSubmit}
        className='space-y-4 w-[500px] py-10 px-6 rounded-sm border border-black'
      >
        <h2 className='text-4xl text-gray-700'>Sign Up</h2>
        <div>
          <label>Email</label>
          <input
            value={userEmail}
            type='email'
            disabled
            placeholder='shadcn'
            className='mt-2 w-full border p-2 text-md text-gray-600 rounded-md border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed'
          />
        </div>
        <div className='flex items-center space-x-4'>
          <div>
            <label>First Name</label>
            <input
              value={userFirstname}
              type='text'
              disabled
              placeholder='shadcn'
              className='w-full mt-2 border p-2 text-md text-gray-600 rounded-md border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed'
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              value={userlastname}
              type='email'
              disabled
              placeholder='shadcn'
              className='w-full mt-2 border p-2 text-md text-gray-600 rounded-md border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed'
            />
          </div>
        </div>

        <div>
          <label>Role</label>
          <select
            value={role}
            className={`mt-2 w-full border bg-white p-2 text-md rounded-md border-black outline-none ${
              !role && "text-gray-600 text-[14px]"
            }`}
            onChange={(e) => setRole(e.target.value)}
          >
            <option
              value=''
              disabled
              className='text-gray-400'
            >
              Select the role to register
            </option>
            <option value='dist'>Distributor</option>
            <option value='branch'>Branch</option>
            <option value='store'>Store</option>
          </select>
        </div>
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  );
}

export default SignUp;
