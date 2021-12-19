import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
import { getAllListsPeserta } from "../../../redux/actions/site-management/user/peserta-dts";
import { loadDataListZonasi } from "../../../redux/actions/site-management/dashboard.actions";

const SiteManagementDashboard = dynamic(
  () =>
    import(
      "../../../components/content/site-management/dashboard/dashboard-site-management"
    ),
  { loading: () => <LoadingSkeleton /> }
);

export default function DashboardSiteManagement(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <SiteManagementDashboard token={session.token} user={session.user} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ req }) => {
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

    await store.dispatch(getAllListsPeserta(session.user.user.data.token));
    await store.dispatch(loadDataListZonasi(session.user.user.data.token));

    return {
      props: { session, title: "Dashboard - Site Management" },
    };
  }
);
