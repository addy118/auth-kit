"use server";

import {  RegiSchema } from "@/schemas";
import * as z from "zod";


export const register = async (values: z.infer<typeof RegiSchema>) => {
  console.log(values);
  const validatedFields = RegiSchema.safeParse(values);

  if (!validatedFields) return { error: "Invalid Fields" };

  return { success: "Email sent!" };
};
