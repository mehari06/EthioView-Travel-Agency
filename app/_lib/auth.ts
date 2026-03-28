import NextAuth, { Session, User } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

declare module "next-auth" {
  interface Session {
    user: {
      guestId: number;
    } & User;
  }
}

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "placeholder-google-client-id",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "placeholder-google-client-secret",
    }),
  ],
  secret: process.env.AUTH_SECRET || "dev-insecure-auth-secret",
  callbacks: {
    authorized({ auth, request }: { auth: Session | null; request: any }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }: { user: User; account: any; profile?: any }) {
      if (!user.email) return false;

      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name || "" });
      } catch (error) {
        // Never block OAuth sign-in because of a transient DB issue.
        console.error("signIn callback guest sync failed:", error);
      }

      return true;
    },
    async session({ session, user }: { session: Session; user: User }) {
      if (session.user?.email) {
        try {
          let guest = await getGuest(session.user.email);

          if (!guest) {
            guest = await createGuest({
              email: session.user.email,
              fullName: session.user.name || "",
            });
          }

          if (guest) {
            session.user.guestId = guest.id;
          } else {
            session.user.guestId = 0;
          }
        } catch (error) {
          console.error("session callback guest sync failed:", error);
          session.user.guestId = 0;
        }
      } else {
        session.user.guestId = 0;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig as any);
