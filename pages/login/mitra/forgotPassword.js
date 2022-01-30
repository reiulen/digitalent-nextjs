import dynamic from "next/dynamic";
// import ForgotPassword from "../../../components/content/partnership/user/auth/forgotPassword";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { middlewareAuthMitraSession } from "../../../utils/middleware/authMiddleware";
const ForgotPassword = dynamic(
  () =>
    import("../../../components/content/partnership/user/auth/forgotPassword"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function ForgotPasswordMitra() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ForgotPassword />
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
      title: "Lupa Password - Partnership",
    },
  };
}
