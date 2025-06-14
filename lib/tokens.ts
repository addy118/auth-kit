import VerificationToken from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import PassResetToken from "@/data/pass-reset";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 60 * 60 * 1000);

  const existingToken = await VerificationToken.getByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePassResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 60 * 60 * 1000);

  const existingToken = await PassResetToken.getByEmail(email);

  if (existingToken) {
    await db.passResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passResetToken = await db.passResetToken.create({
    data: { email, token, expires },
  });

  return passResetToken;
};
