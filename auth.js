import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectDB } from "/util/database";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),

    Credentials({
      credentials: {
        email: {
          label: "이메일",
          type: "text",
          placeholder: "example@naver.com",
        },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        let db = (await connectDB).db("forum");

        let user = await db
          .collection("user_cred")
          .findOne({ email: credentials.email });
        if (!user) {
          console.log("해당 이메일의 가입유저가 없습니다.");
          return;
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!pwcheck) {
          console.log("비밀번호를 잘못 입력하였습니다.");
          return null;
        }
        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30일
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
        token.user.role = user.role;
        token.user._id = user._id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },

  adapter: MongoDBAdapter(connectDB),
  secret: "qwer1234",
});
