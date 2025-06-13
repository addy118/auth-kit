"use server";

import bcrypt from "bcrypt";
import { RegiSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import User from "@/data/user";

export const register = async (values: z.infer<typeof RegiSchema>) => {
  console.log(values);
  const validatedFields = RegiSchema.safeParse(values);

  if (!validatedFields) return { error: "Invalid Fields" };

  const { name, email, password } = validatedFields.data!;
  const hashedPass = await bcrypt.hash(password, 10);

  const existingUser = await User.getByEmail(email);

  if (existingUser) return { error: "Email already in use!" };
  console.log(name, email, hashedPass);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPass,
    },
  });

  // TODO: send verfication token email

  return { success: "User created!" };
};
