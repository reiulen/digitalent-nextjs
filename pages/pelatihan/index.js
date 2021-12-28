import dynamic from "next/dynamic";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../redux/store";
import { middlewareAuthAdminSession } from "../../utils/middleware/authMiddleware";

const DashboardPelatihan = dynamic(
  () =>
    import("../../components/content/pelatihan/dashboard/dashboard-pelatihan"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function Dashboard(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DashboardPelatihan token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
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

      return {
        props: { session, title: "Dashboard - Pelatihan" },
      };
    }
);
