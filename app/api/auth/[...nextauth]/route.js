import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import User from "@/models/user";
import connectDb from "@/db/connectDB";

const authOptions = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        if (account.provider === "github") {
          await connectDb(); // Ensure database connection

          const existingUser = await User.findOne({ email: email });
          if (!existingUser) {
            await User.create({
              email: user.email,
              username: user.email.split("@")[0],
            });
          }
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error); // Added logging
        return false;
      }
    },
    async session({ session, token, user }) {
      try {
        await connectDb(); // Ensure database connection
        const dbUser = await User.findOne({ email: session.user.email });
        session.user.name = dbUser.username;
        return session;
      } catch (error) {
        console.error("Error in session callback:", error); // Added logging
        return session;
      }
    },
  },
});

export { authOptions as GET, authOptions as POST };
