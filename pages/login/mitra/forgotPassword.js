import ForgotPassword from "../../../components/content/partnership/user/auth/forgotPassword";
import { getSession } from "next-auth/client";

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
