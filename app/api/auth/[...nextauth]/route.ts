import { AppConfig } from "@/app/_constants/AppConfig";
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
//api
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await axios.get(
          `${AppConfig.apiURL}/user/${credentials?.email}`
        );

        const user = res.data.data;

        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async session({ session }) {
      const res = await axios.get(
        `${AppConfig.apiURL}/user/${session.user?.email}`
      );
      session.user = res.data.data;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
