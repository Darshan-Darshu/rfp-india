import SignUp from "@/components/SignUp";
import SignUpProvider from "@/components/SignUpProvider";

function SignupPage() {
  return (
    <div>
      <SignUpProvider>
        <SignUp />
      </SignUpProvider>
    </div>
  );
}

export default SignupPage;
