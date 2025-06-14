import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import User from "./data/user";

export const {
  // nested destructuring
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  callbacks: {
    // don't allow unverified email users to login
    async signIn({ user, account }) {
      // only allow oauth without email verification
      if (account?.provider !== "credentials") return true;

      if (!user.id) return false;

      // prevent sign in w/o email verification
      const existingUser = await User.getById(user.id);
      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }

      // TODO: add 2fa check

      // allow signIn
      return true;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await User.getById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },

    async session({ token, session }) {
      console.log({
        sessionToken: token,
        session,
      });

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
