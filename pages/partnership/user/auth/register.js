import RegisterUser from "../../../../components/content/partnership/user/auth/register";
import { getSession } from "next-auth/client";

export default function LoginMitra() {
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
  if (session) {
    return {
      redirect: {
        destination: "/",
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
