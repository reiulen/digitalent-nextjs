import DashboardUser from "../../../components/content/site-management/dashboard/dashboard-user";
// import Layout from "../../components/templates/layout.component";
import { getSession } from "next-auth/client";

export default function Dashboard() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DashboardUser />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session, title: "Dashboard - User" },
  };
}
