import Email from "next-auth/providers/email";
import {NextAuthConfig} from "next-auth";
import {DrizzleAdapter} from "@auth/drizzle-adapter";

import {db} from "@/db";

export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET!,
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },

  providers: [
    Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    authorized({auth, request: {nextUrl}}) {
      const isLoggedIn = !!auth?.user;
      const path = ["/protected", "/profile"];
      const isProtected = path.some((path) => nextUrl.pathname.startsWith(path));

      if (!isLoggedIn && isProtected) {
        return false;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
