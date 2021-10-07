import DashboardSetting from "../../../components/content/site-management/dashboard/dashboard-setting";
// import Layout from "../../components/templates/layout.component";
import { getSession } from "next-auth/client";

export default function Dashboard() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DashboardSetting />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "http://dts-dev.majapahit.id/",
        permanent: false,
      },
    };
  }

  return {
    props: { session, title: "Dashboard - Setting" },
  };
}
