import dynamic from "next/dynamic";
// import RegisterUserOtp from "../../components/content/auth/user/register-otp";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../components/LoadingSkeleton";

const RegisterUserOtp = dynamic(
  () => import("../../components/content/auth/user/register-otp"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function RegisterUserOtpPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <RegisterUserOtp />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  // if (session) {
  //   return {
  //     redirect: {
  //       destination: "/dashboard",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      data: "auth",
    },
  };
}
