import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from './prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID || '',
      clientSecret: process.env.AUTH_GITHUB_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    session: ({ session, token }) => {
      if (session.user && token?.sub) {
        (session.user as any).id = token.sub
      }
      return session
    },
  },
})

