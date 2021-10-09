import LoginUser from "../../components/content/auth/user/login";
import Beranda from "../../user-component/content/beranda/beranda";
import { getSession } from "next-auth/client";
//check login

export default function LoginUserPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <LoginUser />
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
