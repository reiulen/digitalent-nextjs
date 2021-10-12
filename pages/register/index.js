import RegisterUser from "../../components/content/auth/user/register";
import { getSession } from "next-auth/client";

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
  // if (session) {
  //   return {
  //     redirect: {
  //       destination: "/dashboard",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      data: "auth",
    },
  };
}
