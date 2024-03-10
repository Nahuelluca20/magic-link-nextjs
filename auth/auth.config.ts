import {NextAuthConfig} from "next-auth";
import {DrizzleAdapter} from "@auth/drizzle-adapter";

import {db} from "@/db";

export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET!,
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    authorized({auth, request: {nextUrl}}) {
      const isLoggedIn = !!auth?.user;
      const path = ["/protected", "/profile"];
      const isProtected = path.some((path) => nextUrl.pathname.startsWith(path));

      if (!isLoggedIn && isProtected) {
        const redirectUrl = new URL("/signin", nextUrl.origin);

        return Response.redirect(redirectUrl);
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
