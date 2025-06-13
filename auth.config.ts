import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import User from "./data/user";
import bcrypt from "bcryptjs";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      async authorize(credentials, request) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }
        const { email, password } = validatedFields.data;
        const user = await User.getByEmail(email);

        // the user didn't register using a password
        if (!user || !user.password) return null;

        const matched = await bcrypt.compare(password, user.password);

        if (!matched) return null;
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
