import { signInAction } from "../_lib/actions";
import Image from "next/image";

function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex w-full sm:w-auto items-center justify-center gap-4 text-base sm:text-lg border border-primary-300 px-6 sm:px-10 py-3 sm:py-4 font-medium">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
