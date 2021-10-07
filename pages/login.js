import LoginAdmin from "../components/content/auth/admin/login";
import Beranda from "../user-component/content/beranda/beranda"
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
    return {
      redirect: {
        // destination: "/dashboard",
        destination: "/subvit",
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
