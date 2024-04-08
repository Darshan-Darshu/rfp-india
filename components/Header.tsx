import {
  SignInButton,
  SignOutButton,
  auth,
} from "@clerk/nextjs";

function Header() {
  const { userId } = auth();

  return (
    <header className='flex items-center justify-between px-10 py-5'>
      <h1>Logo</h1>
      {userId ? (
        <SignOutButton />
      ) : (
        <SignInButton
          mode='modal'
          afterSignInUrl='/login'
          afterSignUpUrl='/signup'
        />
      )}
    </header>
  );
}

export default Header;
