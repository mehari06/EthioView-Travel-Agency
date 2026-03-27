import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  let session = null;
  try {
    session = await auth();
  } catch {
    session = null;
  }

  const firstName = session?.user?.name?.split(" ").at(0) || "Guest";

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {firstName}
    </h2>
  );
}
