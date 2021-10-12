import dynamic from "next/dynamic";

// import LoginUser from "../../components/content/auth/user/login";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../components/LoadingSkeleton";
//check login login

const LoginUser = dynamic(
  () => import("../../components/content/auth/user/login"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function LoginUserPage() {
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
  // console.log(session.user.user.data); untuk cek role user
  if (session) {
    return {
      redirect: {
        destination: "/peserta",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: "auth",
    },
  };
}
