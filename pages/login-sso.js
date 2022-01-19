import React, { useEffect } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import axios from "axios";
import { getSession } from "next-auth/client";

export default function LoginSso() {
  const router = useRouter();
  const { token_nik, token_id } = router.query;

  useEffect(() => {
    if (token_nik && token_id) {
      const data = {
        token_nik,
        token_id,
        role: "peserta_sso",
      };
      (async () => {
        const result = await signIn("credentials", data);
        if (result.error) {
          router.push("/login");
        } else {
          router.push("/peserta");
        }
      })();
    }
  }, [token_nik, token_id, router]);

  return (
    <>
      <p>Tunggu Sebentar...</p>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
    const data = session.user.user.data;
    if (data.user.roles[0] !== "user") {
      return {
        redirect: {
          destination: "/login/admin",
          permanent: false,
        },
      };
    }
    if (data.user.roles[0] === "user") {
      return {
        redirect: {
          destination: "/peserta",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      data: "auth",
    },
  };
}
