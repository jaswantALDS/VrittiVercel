import { Constants } from "@/constants/constants";
import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleAuthenticationProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = NextAuth({
  secret: process.env.jwt_secret,
  jwt: {
    secret: process.env.jwt_secret,
  },
  session: {
    strategy: "jwt",
    updateAge: 1000 * 60 * 60 * 24,
  },

  providers: [
    GoogleAuthenticationProvider({
      id: "google-user-login",
      clientId: process.env.GOOGLE_CLIENT_ID
        ? process.env.GOOGLE_CLIENT_ID
        : "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
        ? process.env.GOOGLE_CLIENT_SECRET
        : "",

      profile: async (profile) => {
        console.log(profile.email);
        try {
          const { data } = await axios.post(Constants.checkIfUserExists, {
            email: profile.email.toString(),
          });

          if (!data.exists) {
            const savedUser = await axios.post(Constants.registerEmployer, {
              first_name: profile.given_name,
              last_name: profile.family_name,
              email: profile.email,
              password: profile.sub,
              source: "web",
            });

            const accessData = await axios.post(Constants.authenticateLawyer, {
              email: savedUser.data.email,
              password: profile.sub,
            });

            return {
              id: savedUser.data.id,
              email: savedUser.data.email,
              image: accessData.data.access.toString(),
              type: "user",
            };
          } else {
            return {
              id: data.user.id.toString(),
              email: data.user.email.toString(),
              image: data.access.toString(),
              type: "user",
            };
          }
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
    }),



    CredentialProvider({
      name: "credentials",
      id: "employee-login",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@test.com",
        },
        password: { label: "Password", type: "password" },
        
      },
      authorize: async (credentials) => {
        try {
          const { data } = await axios.post(Constants.employee_login, {
            username: credentials?.username,
            password: credentials?.password,
          });
          const config = {
            headers: {
              Authorization: `Bearer ${data.access}`,
            },
          };
          const userData = await axios.get(Constants.employee_me, config);

          return {
            id: userData?.data?.id.toString(),
            email: userData.data.email.toString(),
            image: data.access.toString(),
            is_completed: userData?.data?.is_completed,
            type: "employee",
          };
        } catch (error: any) {
          if (error.response.data.message) {
            throw new Error(error.response.data.message);
          }
          throw new Error(error);
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async jwt({ token, user, account }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.uToken = user.uToken;
        token.type = user.type;
        token.is_completed = user.is_completed;
      }

      return token;
    },
    async session({ session, token }: any) {
      session.id = token.id;
      session.name = token.name;
      session.email = token.email;
      session.uToken = token.uToken;
      session.type = token.type;
      session.is_completed = token.is_completed;
      return session;
    },

    // session: ({ session, token, user }: any) => {
    //   console.log(token);
    //   if (token) {
    //     session.id = token.id;
    //     session.name = token.name;
    //     session.email = token.email;
    //     session.uToken = token.uToken;
    //     session.type = token.type;
    //   }

    //   return session;
    // },
  },

  debug: false,
});

export { authOptions as GET, authOptions as POST };




