import RegisterUserOtp from "../../components/content/auth/user/register-otp";
import { getSession } from "next-auth/client";

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
