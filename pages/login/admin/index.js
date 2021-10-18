import LoginAdmin from "../../../components/content/auth/admin/login";
import Beranda from "../../../user-component/content/beranda/beranda";
import { getSession } from "next-auth/client";

export default function LoginAdminPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <LoginAdmin />
        {/* <Beranda /> */}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
    const data = session.user.user.data;
    console.log(data);
    if (data.user.roles[0] === "user") {
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
