import dynamic from "next/dynamic";

// import LoginUser from "../../components/content/auth/user/login";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../components/LoadingSkeleton";

const PasswordPemulihan = dynamic(
  () => import("../../components/content/auth/user/password-pemulihan"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);
// const PasswordPemulihan = dynamic(
//   () =>
//     import("../../components/content/auth/user/templateEmailForgotPassword"),
//   {
//     loading: function loadingNow() {
//       return <LoadingSkeleton />;
//     },
//     ssr: false,
//   }
// );

export default function PasswordPemulihanPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <PasswordPemulihan />
      </div>
    </>
  );
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
