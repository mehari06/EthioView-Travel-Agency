import Link from "next/link";

function LoginMessage() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <p className="text-lg text-slate-600 mb-4">
        Please sign in to reserve this lodge.
      </p>
      <Link href="/login" className="btn-primary">
        Sign in to continue
      </Link>
    </div>
  );
}

export default LoginMessage;
