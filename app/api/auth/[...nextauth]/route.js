import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import User from "@/models/user";
import payment from "@/models/payment";
import connectDb from "@/db/connectDB";

const authOptions = NextAuth({
  providers: [
    // OAuth authentication providers...

    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "github") {
        await connectDb();

        const existingUser = await User.findOne({ email: email });
        console.log("existing console", existingUser);
        if (!existingUser) {
          const newUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
          // console.log("user.name", user.name);
        }
      }
      return true;
    },
    async session({ session, token, user }) {
      const dbUser = await User.findOne({ email: session.user.email });
      session.user.name = dbUser.username;
      return session;
    },
  },
});

export { authOptions as GET, authOptions as POST };
