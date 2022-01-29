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
        const { email, password, role, capcha, token_nik, token_id, fcm } =
          credentials;
        if (role !== "peserta_sso")
          if (!email || !password) {
            throw new Error("Isi Email atau Password dengan benar");
          }
        try {
          let link =
            process.env.END_POINT_API_SITE_MANAGEMENT + "api/auth/login";

          let credential = {
            email,
            password,
            capcha,
          };

          if (role === "mitra") {
            link =
              process.env.END_POINT_API_PARTNERSHIP +
              "api/authentication/login";
          }

          if (role === "peserta") {
            link = process.env.END_POINT_API_PELATIHAN + `api/v1/auth/login`;
            credential = {
              email,
              password,
              capcha,
              fcm,
            };
          }

          if (role === "peserta_sso") {
            link =
              process.env.END_POINT_API_PELATIHAN + `api/v1/auth/login-token`;
            credential = {
              token_nik,
              token_id,
              fcm,
            };
          }

          const { data } = await axios.post(link, credential);

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
