// import { AuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import jwt, { JwtPayload, Secret } from "jsonwebtoken";
// import type { Adapter } from "@auth/core/adapters"

// // const prisma = new PrismaClient();

// export const authOptions: AuthOptions = {
//   //! Do not use PrismaAdapter, it shows callback error
//   // adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       type: "credentials",
//       credentials: {
//         username: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           const res = await fetch(`${process.env.BACKEND_URL}/api/auth`, {
//             method: "POST",
//             body: JSON.stringify(credentials),
//             headers: { "Content-Type": "application/json" },
//           });
//           const data = await res.json();
//           const token = jwt.verify(
//             data?.token,
//             process.env.NEXTAUTH_SECRET as Secret
//           ) as JwtPayload;
//           return {
//             ...data,
//             ...token,
//           };
//         } catch (err) {
//           return null;
//         }
//       },
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET,
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/auth/signin",
//     signOut: "/",
//     error: "/",
//   }
// };
