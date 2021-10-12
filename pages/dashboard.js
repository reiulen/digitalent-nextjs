import { getSession } from "next-auth/client";

export default function DashboardPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root"></div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/login/admin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
