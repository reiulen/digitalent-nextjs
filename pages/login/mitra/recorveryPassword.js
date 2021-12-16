import dynamic from "next/dynamic";
// import RecoveryPassword from "../../../components/content/partnership/user/auth/recoveryPassword";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const RecoveryPassword = dynamic(
  () => import("../../../components/content/partnership/user/auth/recoveryPassword"),
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
      title: "Pemulihan Email - Partnership",
    },
  };
}
