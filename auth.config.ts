import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

export default {
    providers: [Google], basePath: "/auth",
    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl
            if (pathname === "/middleware-example") return !!auth
            return true
        },
        jwt({ token, trigger, session }) {
            if (trigger === "update") token.name = session.user.name
            return token
        },
    }, theme: { logo: "https://authjs.dev/img/logo-sm.png" },
} satisfies NextAuthConfig