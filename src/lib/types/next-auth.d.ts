import NextAuth from "next-auth/next";

declare module 'next-auth' {
  interface User {
    id: number;
    email: string;
    name: string;
    accessToken: string;
  }
  interface Session {
    user: User;
  }
}
