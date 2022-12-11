import NextAuth, { type NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: env.TWITTER_CLIENT_ID!,
      clientSecret: env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
      authorization: {
        url: "https://twitter.com/i/oauth2/authorize",
        params: {
          scope:
            "users.read tweet.read tweet.write offline.access bookmark.read",
        },
      },
    }),
  ],

  /*
  * Sample response from Twitter OAuth 2.0:
  Data:  {
    token: {
      name: 'Ryan',
      email: undefined,
      picture: '<PIC_LINK>',
      sub: '123456789',
    },
    user: {
      id: '123456789',
      name: 'Ryan',
      email: undefined,
      image: 'IMG_LINK'
    },
    account: {
      provider: 'twitter',
      type: 'oauth',
      providerAccountId: '123456789',
      token_type: 'bearer',
      expires_at: 123456789,
      access_token: '123456789',
      scope: 'users.read tweet.read offline.access bookmark.read',
      refresh_token: '123456789',
    },
    profile: {
      data: {
        profile_image_url: 'IMG_LINK',
        id: '123456789',
        username: 'pseudorandom',
        name: 'Ryan'
      }
    },
    isNewUser: undefined
  }
  */
  callbacks: {
    session({ session, user, token }) {
      console.log("TOKEN FROM CALLBACK", token);
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  secret: env.NEXTAUTH_SECRET!,
};

export default NextAuth(authOptions);
