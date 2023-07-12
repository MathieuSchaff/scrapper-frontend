import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({

      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        // email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      //       {
      // 	"email": "mathieu@gmail.com",
      // 	"password": "mathieuPASSWORD"
      // }
      async authorize(credentials, req) {
        console.log("in next auth route provider authorize", credentials)
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }
        // console.log("credentials", credentials);
        // Add logic here to look up the user from the credentials supplied
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    signOut: '/signout',
    error: '/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
  },
  // we will define two objects: jwt and session.
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // console.log("jwt", token, user, trigger, session)
      // if (trigger === "session" && session?.user) {
      //   token = session.user;
      // }
      if (trigger === "update") {
        return { ...token, ...session.user }
      }

      // console.log("jwt", token, user)
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token as any;
      // console.log("session", session)
      return session;
    },

  },
  // session: {
  //   strategy: "jwt",
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  //   updateAge: 24 * 60 * 60, // 24 hours
  // },

});
export { handler as GET, handler as POST };
