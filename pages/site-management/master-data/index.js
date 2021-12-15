import DashboardMasterData from "../../../components/content/site-management/dashboard/dashboard-master-data";
// import Layout from "../../components/templates/layout.component";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

export default function Dashboard({ session }) {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DashboardMasterData session={session} />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  const middleware = middlewareAuthAdminSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

  return {
    props: { session, title: "Dashboard - Master Data" },
  };
}
