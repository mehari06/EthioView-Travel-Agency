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
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }: { auth: Session | null; request: any }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }: { user: User; account: any; profile?: any }) {
      try {
        if (!user.email) return false;
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name || "" });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }: { session: Session; user: User }) {
      if (session.user?.email) {
        const guest = await getGuest(session.user.email);
        if (guest) {
          session.user.guestId = guest.id;
        }
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
