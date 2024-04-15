export const runtime = "nodejs";

import NextAuth from "next-auth"
import type { Adapter } from 'next-auth/adapters';
import authConfig from "@/auth.config"

import type { NextAuthConfig } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import db from "@/lib/prisma"

export const config = {
  adapter: PrismaAdapter(db) as Adapter,
  session: {strategy: "jwt"},
  ...authConfig
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

