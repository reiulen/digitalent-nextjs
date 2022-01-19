import dynamic from "next/dynamic";
import { middlewareAuthAdminSession } from "../../utils/middleware/authMiddleware";

import { getAllDashboardPublikasi } from "../../redux/actions/publikasi/dashboard-publikasi.actions";
import { wrapper } from "../../redux/store";
import { getSession } from "next-auth/client";

import LoadingSkeleton from "../../components/LoadingSkeleton";

const DashboardPublikasi = dynamic(
  () =>
    import(
      "../../components/content/publikasi/dashboard-publikasi/dashboard-publikasi"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function DashboardPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DashboardPublikasi token={session.token} />
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

      await store.dispatch(
        getAllDashboardPublikasi(session.user.user.data.token, req.cookies.token_permission)
      );
      return {
        props: { session, title: "Dashboard - Publikasi" },
      };
    }
);
