import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt"
import LinkedinProvider from "next-auth/providers/linkedin";
import { createHash, randomBytes } from 'crypto'
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import UsersController from "../../../lib/users/usersController";
import DataBase from "../../../lib/database";
import SequelizeAdapter from "../../../lib/nextauthSequelize/adapter";

const adapter = SequelizeAdapter( DataBase.get(), {});



export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = await UsersController.authenticate(credentials);
        if (user) {
          const jwtUser = {
            role:user.role,
            name: user.name,
            image:user.avatar,
            email:user.email,
            id: user.id,
          };
          return jwtUser
        } else {
          return null
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      checks:[],
    }),
    LinkedinProvider({
      clientId: process.env.LINKEDIN_CLIENTID,
      clientSecret: process.env.LINKEDIN_CLIENTSECRET,
    }),
  ],
  adapter,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async signIn(info) {
      const accountUser = await UsersController.findByAuth(info.account.providerAccountId, info.account.provider);
      if (accountUser) return true
      const emailUser = await UsersController.findBy( 'email', info.user.email);
      if (emailUser) {
        await UsersController.createAuthAccount(
          { ...info.account, UserId: emailUser.id }
        )
        return true;
      }
      const user = await UsersController.create(
        { ...info.user, id: null, avatar: info.user.avatar }
      )
      await UsersController.createAuthAccount(
        { ...info.account, UserId: user.id }
      )
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session( info ) {
      return { ...info.session, userId: parseInt(info.token.sub) }
    },
    async jwt(info) {
      return info.token
    }
  }
})
