import { SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

function NonUserMain() {
  return (
    <div>
      <div className='flex h-[60vh] bg-gray-300'>
        <div className='flex-1 p-24'>
          <h1 className='text-4xl'>Header Information</h1>
          <p className='text-sm text-gray-800 mt-4'>
            Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Nesciunt, cumque facilis.
            Minus, iste et animi, asperiores tempore quod
            recusandae provident porro dicta, dolore
            repellendus sunt quis reiciendis cum deleniti
            exercitationem.
          </p>
          <Button className='mt-4'>
            <SignInButton
              mode='modal'
              afterSignInUrl='/login'
              afterSignUpUrl='/signup'
            />
          </Button>
        </div>
        <div className='flex items-center justify-end w-[30%] h-full'>
          <div className='flex items-center justify-center bg-white w-full h-[80%] mr-24 shadow-md'>
            <p>Video/Image</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NonUserMain;
