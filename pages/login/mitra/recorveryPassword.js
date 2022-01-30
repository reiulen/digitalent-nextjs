import dynamic from "next/dynamic";
// import RecoveryPassword from "../../../components/content/partnership/user/auth/recoveryPassword";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { middlewareAuthMitraSession } from "../../../utils/middleware/authMiddleware";

const RecoveryPassword = dynamic(
  () =>
    import(
      "../../../components/content/partnership/user/auth/recoveryPassword"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function RecoveryPasswordMitra() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <RecoveryPassword />
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
      title: "Pemulihan Email - Partnership",
    },
  };
}
