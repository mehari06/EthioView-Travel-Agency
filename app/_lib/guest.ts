import { Session } from "next-auth";
import { createGuest, getGuestIdsByEmail } from "./data-service";

export async function resolveGuestId(session: Session | null): Promise<number | null> {
  const guestIds = await resolveGuestIds(session);
  return guestIds[0] ?? null;
}

export async function resolveGuestIds(session: Session | null): Promise<number[]> {
  if (!session?.user) return [];

  const sessionGuestId =
    typeof session.user.guestId === "number" && session.user.guestId > 0
      ? session.user.guestId
      : null;

  if (!session.user.email) {
    return sessionGuestId ? [sessionGuestId] : [];
  }

  try {
    const guestIds = await getGuestIdsByEmail(session.user.email);
    if (guestIds.length) return guestIds;

    const guest = await createGuest({
      email: session.user.email,
      fullName: session.user.name || "",
    });

    return guest?.id ? [guest.id] : [];
  } catch {
    return sessionGuestId ? [sessionGuestId] : [];
  }
}
