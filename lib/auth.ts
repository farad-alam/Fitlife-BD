import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@fitlifebd.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Secure hardcoded single-admin fallback relying on Vercel Env Vars
        if (
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "1", name: "Fitlife Admin", email: credentials.email as string };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');

      if (isOnAdmin) {
        if (nextUrl.pathname.startsWith('/admin/login')) {
          if (isLoggedIn) return Response.redirect(new URL('/admin', nextUrl));
          return true; // Allow unauthenticated to see login page
        }
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to /admin/login
      }

      return true; // Let them through for all non-admin routes
    },
  },
});
