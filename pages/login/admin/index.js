import LoginAdmin from "../../../components/content/auth/admin/login";
import { getSession } from "next-auth/client";

export default function LoginAdminPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <LoginAdmin />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
    const data = session.user.user.data;

    if (data.user.roles === "user") {
      return {
        redirect: {
          destination: "/peserta",
          permanent: false,
        },
      };
    }
    return {
      redirect: {
        destination: "/dashboard",
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
