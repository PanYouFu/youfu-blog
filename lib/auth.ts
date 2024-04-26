import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/blogs",
    error: "/",
  },
  events: {
    signIn(message) {
      console.log("message----", message);
    },
  },
  callbacks: {
    // 调用 getSession 和 useSession 时会触发
    session: ({ session, token }) => {
      if (session.user && token?.sub) {
        (session.user as any).id = token.sub;
      }
      // 添加权限
      if (session.user?.email === "18860976892@163.com") {
        (session.user as any).permission = true;
      } else {
        (session.user as any).permission = false;
      }
      return session;
    },
    // async signIn({ profile }) {
    //   // Only allow sign in for users with email addresses ending with "yourdomain.com"
    //   console.log("----------callback------");

    //   if (!profile?.email?.endsWith("@163.com")) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // },
  },
});
