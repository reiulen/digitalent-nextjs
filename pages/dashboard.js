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
        destination: "http://dts-dev.majapahit.id/login/admin",
        permanent: false,
      },
    };
  }

  const data = session.user.user.data;
  if (data.user.roles[0] === "user") {
    return {
      redirect: {
        destination: "/peserta",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
