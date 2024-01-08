import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import prisma from "@/lib/prisma"
export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [Google],
    callbacks: {
        async signIn({ user, }) {
            if (!user) throw new Error("No user")
            await prisma.user.upsert({
                where: { email: user.email || "" },
                create: {
                    email: user.email || "",
                    name: user.name,
                    avatar: user.image,
                },
                update: {
                    name: user.name,
                    avatar: user.image,
                },
            })
            return true
        }
    }

})