import dynamic from "next/dynamic";
// import ForgotPassword from "../../../components/content/partnership/user/auth/forgotPassword";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const ForgotPassword = dynamic(
  () => import("../../../components/content/partnership/user/auth/forgotPassword"),
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
  if (session) {
    return {
      redirect: {
        destination: "http://dts-dev.majapahit.id/partnership/user/kerjasama",
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
