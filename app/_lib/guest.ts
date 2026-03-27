import { Session } from "next-auth";
import { createGuest, getGuest } from "./data-service";

export async function resolveGuestId(session: Session | null): Promise<number | null> {
  if (!session?.user) return null;

  if (typeof session.user.guestId === "number" && session.user.guestId > 0) {
    return session.user.guestId;
  }

  if (!session.user.email) return null;

  try {
    let guest = await getGuest(session.user.email);

    if (!guest) {
      guest = await createGuest({
        email: session.user.email,
        fullName: session.user.name || "",
      });
    }

    return guest?.id ?? null;
  } catch {
    return null;
  }
}
