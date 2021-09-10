import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import axios from "axios";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("Isi Email atau Password dengan benar");
        }
        try {
          const { data } = await axios.post(
            "http://api-dts-dev.majapahit.id/sso/api/auth/login",
            { email, password }
          );

          return Promise.resolve(data);
        } catch (e) {
          const msg = e.response.data.message;
          throw new Error(msg);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user) => {
      user && (token.user = user);
      return Promise.resolve(token);
    },
    session: async (session, user) => {
      user && (session.user = user);
      return Promise.resolve(session);
    },
  },
});
