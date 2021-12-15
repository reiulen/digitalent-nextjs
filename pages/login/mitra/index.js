import dynamic from "next/dynamic";
// import LoginUser from "../../../components/content/partnership/user/auth/login";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const LoginUser = dynamic(
  () => import("../../../components/content/partnership/user/auth/login"),
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
        <LoginUser />
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
      title: "Login - Partnership",
    },
  };
}
