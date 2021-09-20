import RegisterAdmin from "../../components/content/auth/admin/register";
import { getSession } from "next-auth/client";

export default function RegisterAdminPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <RegisterAdmin />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
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
