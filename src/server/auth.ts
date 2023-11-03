import { PrismaAdapter } from "@next-auth/prisma-adapter";
import axios from "axios";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type TokenSet,
  type Account
} from "next-auth";
import { type JWT, type DefaultJWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";

import { env } from "~/env.mjs";
import { db } from "~/server/db";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    // user: {
    //   id: string;
    //   // ...other properties
    //   // role: UserRole;
    // } & DefaultSession["user"];  
    accessToken: string | undefined
  }
}
declare module "next-auth/jwt" {
  interface JWT extends Record<string, unknown>, DefaultJWT {
    accessToken: string | undefined
    refreshToken: string | undefined
    expires_at: number | undefined
  }
}

/**
 * Defining Spotify API specific information.
 *
 * @see https://developer.spotify.com/documentation/web-api/tutorials/code-flow
 * @see https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens
 */
const LOGIN_URL = "https://accounts.spotify.com/authorize?" + new URLSearchParams({
  scope: ["user-top-read"].join(","),
}).toString()

//Extending the TokenSet since it doesn't have a property expires_in
interface SpotifyRefreshTokenResponse extends TokenSet {
  expires_in: number
}

const refreshAccessToken = async (token: TokenSet) => {
  try {
    const response = await axios.post<SpotifyRefreshTokenResponse>("https://accounts.spotify.com/api/token", {
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: 'Basic ' + (Buffer.from(env.SPOTIFY_CLIENT_ID + ':' + env.SPOTIFY_CLIENT_SECRET).toString('base64')),
      }
    })

    const tokens: SpotifyRefreshTokenResponse = response.data
    
    return {
      ...token,
      accessToken: tokens.access_token,
      //Tokens.expires_in is equal to 3600 seconds (1 hour)
      //We need to convert it to milliseconds, such that it can be used in our Date.now() comparison
      expires_at: Date.now() + tokens.expires_in * 1000,
      //If a refresh request has been made before the token has expired, the refresh token will not be returned from the API
      //In this case, we will use the old refresh token
      refreshToken: tokens.refresh_token ?? token.refreshToken,
    }
  }
  catch (error) {
    console.error(error)
  }
}

const newDatabaseUser = async (account: Account, token: JWT) => {
  account.providerAccountId
  prisma.user.create({
    data: {
      name: token.name,
    }
  })
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ account, token }) {
      //Only true for the initial login otherwise account is undefined
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expires_at = account.expires_at

        await newDatabaseUser(account, token)

        return token
      }
      //Token has not expired yet
      else if (token.expires_at && Date.now() < token.expires_at) {
        return token
      }
      //Token has expired
      else {
        const newAccessToken = await refreshAccessToken(token)
        return newAccessToken as JWT & TokenSet
      }
    },
    session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken
      }
      return session
    }
  },
  // adapter: PrismaAdapter(db),
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  session: {
    strategy: "jwt",
  }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
