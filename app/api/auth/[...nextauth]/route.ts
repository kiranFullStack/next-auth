import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],

  callbacks: {
    async signIn({ profile }) {
      const { email, name } = profile

      try {
        // Check if the user already exists in the database
        const existingUser = await prisma.users.findFirst({
          where: {
            email,
          },
        })

        if (!existingUser) {
          // If the user doesn't exist, create a new user in the database
          await prisma.users.create({
            data: {
              email,
              name,
            },
          })
        }
      } catch (error) {
        console.log(error)
      }
      return true
    },
  },
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
