import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import axios from "axios";

export default NextAuth({
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60, // 1 days
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const { email, password, role } = credentials;
        if (!email || !password) {
          throw new Error("Isi Email atau Password dengan benar");
        }
        try {
          let link = "http://api-dts-dev.majapahit.id/sso/api/auth/login";

          if (role === "mitra") {
            link = "http://api-dts-dev.majapahit.id";
          }

          const { data } = await axios.post(link, { email, password });

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
