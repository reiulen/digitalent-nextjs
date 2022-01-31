import dynamic from "next/dynamic";
// import RegisterUser from "../../../components/content/partnership/user/auth/register";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { middlewareAuthMitraSession } from "../../../utils/middleware/authMiddleware";

const RegisterUser = dynamic(
  () => import("../../../components/content/partnership/user/auth/register"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function LoginMitra() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <RegisterUser />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  const middleware = middlewareAuthMitraSession(session);

  if (!middleware.status) {
    return {
      redirect: {
        destination: middleware.redirect,
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: "auth",
      title: "Daftar - Partnership",
    },
  };
}
