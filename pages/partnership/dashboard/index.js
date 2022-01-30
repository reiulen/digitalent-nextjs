import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";
import { fetchDashboard } from "../../../redux/actions/partnership/dashboard.action";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
import { getPartnershipPermissions } from "../../../redux/actions/partnership/partnership_permission.actions";
const Dashboard = dynamic(
  () =>
    import("../../../components/content/partnership/dashboard/DashboardPage"),
  { loading: () => <LoadingSkeleton />, ssr: false }
);

export default function KerjaSamaPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Dashboard token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req });

      const middleware = middlewareAuthAdminSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }
      const cookiePermission = req.cookies.token_permission;

      await store.dispatch(
        fetchDashboard(session.user.user.data.token, cookiePermission)
      );
      await store.dispatch(
        getPartnershipPermissions(
          session.user.user.data.token,
          cookiePermission
        )
      );
      return {
        props: { session, title: "Dashboard - Partnership" },
      };
    }
);
