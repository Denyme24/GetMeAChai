import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
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
    async signIn({ user, account, profile, email }) {
      try {
        // Ensure database connection
        await connectDb();

        // Check if the user already exists
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
          // Create a new user if they don't exist
          await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Deny sign-in on error
      }
    },
    async session({ session }) {
      try {
        // Ensure database connection
        await connectDb();

        // Fetch the user from the database
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.name = dbUser.username; // Set the username in the session
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session; // Return the session even if there's an error
      }
    },
  },

  debug: process.env.NODE_ENV === "development", // Enable debug messages in development
});

export { authOptions as GET, authOptions as POST };
