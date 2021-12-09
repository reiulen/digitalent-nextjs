import React, { useEffect, useCallback } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import axios from "axios";
import { getSession } from "next-auth/client";

export default function LoginSso() {
  const router = useRouter();
  const { token_nik, token_id } = router.query;

  useEffect(() => {
    handlerLoginCallback();
  }, []);

  const handlerLoginCallback = useCallback(() => {
    const data = {
      token_nik,
      token_id,
      role: "peserta_sso",
    };
    const result = handlerLoginSso(data);

    if (result.error) {
      router.push("/");
    } else {
      router.push("/peserta");
    }
  }, [router]);

  const handlerLoginSso = async (data) => {
    const result = await signIn("credentials", data);
    return result;
  };

  return <></>;
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
