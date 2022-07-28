import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          //prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  //
  secret: process.env.SECRET,
  theme: {
    colorScheme: "dark",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.tag = session.user
        .name!.split(" ")
        .join("")
        .toLocaleLowerCase();

      session.user.uid = token.sub;
      return session;
    },
    /*async jwt({ token }) {
       token.userRole = "admin";
       return token;
     },*/
  },
};

export default NextAuth(authOptions);
