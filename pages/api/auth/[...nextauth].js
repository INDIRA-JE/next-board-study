import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "f8aae1365273ea29e0e4",
      clientSecret: "c1298b62ff52ff99b982b3635b4cd11606ded8ff",
    }),
  ],
  secret: "qwe123",
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
