import NextAuth from "next-auth";
import Email from "next-auth/providers/email";

import {authConfig} from "./auth.config";

export const {
  auth,
  signIn,
  signOut,
  handlers: {GET, POST},
} = NextAuth({
  ...authConfig,
  providers: [
    Email({
      server: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
});
