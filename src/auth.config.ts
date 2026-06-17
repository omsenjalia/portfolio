import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user;
      const isAdmin = nextUrl.pathname.startsWith("/admin");

      if (isAdmin) {
        if (!user) return false;
        const isOwner = user.email === process.env.ADMIN_EMAIL
          || (user as any).login === "omsenjalia";
        return isOwner;
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
