import LoginUser from "../../../../components/content/partnership/user/auth/login";
import { getSession } from "next-auth/client";

export default function LoginMitra() {
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
  if (session) {
    return {
      redirect: {
        destination: "http://dts-dev.majapahit.id/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: "auth",
      title: "Login - Partnership",
    },
  };
}
