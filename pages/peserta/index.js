import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";

import { wrapper } from "../../redux/store";
import { getSession } from "next-auth/client";
import { getDataPribadi } from "../../redux/actions/pelatihan/function.actions";
import { getDashboardPeserta } from "../../redux/actions/pelatihan/dashboard-peserta.actions";
import LoadingContent from "../../user-component/content/peserta/components/loader/LoadingContent";
import { middlewareAuthPesertaSession } from "../../utils/middleware/authMiddleware";

const Dashboard = dynamic(
  () => import("../../user-component/content/peserta/dashboard"),
  {
    loading: function loadingNow() {
      return <LoadingContent />;
    },
    ssr: false,
  }
);

const Layout = dynamic(() =>
  import("../../user-component/components/template/Layout.component")
);

export default function DashboardPage(props) {
  const session = props.session.user.user.data.user;
  return (
    <>
      <Layout title="Dashboard Peserta - Pelatihan" session={session}>
        <Dashboard session={session} />
      </Layout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });

      const middleware = middlewareAuthPesertaSession(session);

      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getDashboardPeserta(session.user.user.data.user.token)
      );
      await store.dispatch(getDataPribadi(session.user.user.data.user.token));
      return {
        props: { data: "auth", session, title: "Dashboard - Peserta" },
      };
    }
);
