import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** Extending session with tag and uid */
      tag?: string;
      uid?: string;
    } & DefaultSession["user"];
  }
}
