import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import connectDB from "../../../lib/mongodb";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (user && (await user.matchPassword(credentials.password))) {
          return { email: user.email, name: user.name };
        }
        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/",
  },
});
