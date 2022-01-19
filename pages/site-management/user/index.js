import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import LoadingPage from "../../../components/LoadingPage";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

const DashboardUser = dynamic(
  () =>
    import(
      "../../../components/content/site-management/dashboard/dashboard-user"
    ),
  {
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

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
    props: { session, title: "Dashboard - User" },
  };
}
