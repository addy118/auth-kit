import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`;
  console.log(confirmLink);

  await resend.emails.send({
    from: "no-reply@adityakirti.tech",
    to: email,
    subject: "Confirm your email",
    html: `
    <p>Click <a href="${confirmLink}">here</a> to confirm email.</p>
    `,
  });
};
