import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // TODO: In real implementation, validate against database
        // For now, we'll use hardcoded admin credentials
        const adminUsers = [
          {
            id: "1",
            email: "admin@company.com",
            password: "admin123", // In real app, this should be hashed
            name: "Admin User",
            role: "admin",
          },
        ];

        const user = adminUsers.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
