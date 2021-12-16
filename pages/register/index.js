import dynamic from "next/dynamic";
// import RegisterUser from "../../components/content/auth/user/register";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../components/LoadingSkeleton";

const RegisterUser = dynamic(
  () => import("../../components/content/auth/user/register"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function RegisterUserPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <RegisterUser />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  return {
    props: {
      data: "auth",
    },
  };
}
