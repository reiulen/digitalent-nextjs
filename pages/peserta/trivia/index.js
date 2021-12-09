import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";

import { getDashboardPeserta } from "../../../redux/actions/pelatihan/dashboard-peserta.actions";
import { getDetailRiwayatPelatihan } from "../../../redux/actions/pelatihan/riwayat-pelatihan.actions";

const TriviaPage = dynamic(
  () => import("../../../user-component-new/content/peserta/trivia"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const Layout = dynamic(() =>
  import(
    "../../../user-component-new/components/template/Layout-peserta.component"
  )
);

const BelumTersedia = dynamic(
  () =>
    import(
      "../../../user-component-new/content/peserta/test-substansi/belum-tersedia.jsx"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function TestSubstansiPage(props) {
  const session = props.session.user.user.data.user;
  return (
    <>
      <Layout title="TRIVIA" session={session}>
        {props.success ? <TriviaPage session={session} /> : <BelumTersedia />}
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
      let success = false;

      const { data } = await store.dispatch(
        getDashboardPeserta(session?.user.user.data.user.token)
      );

      const status = data.pelatihan.pelatihan_berjalan.status || "";
      if (!status || status == "") {
        success = false;
      } else if (status.includes("pelatihan")) {
        await store.dispatch(
          getDetailRiwayatPelatihan(
            data.pelatihan.pelatihan_berjalan.id,
            session.user.user.data.user.token
          )
        );
        success = true;
      } else {
        success = false;
      }

      if (session) {
        await store.dispatch(
          getDataPribadi(session?.user.user.data.user.token)
        );
      }

      return {
        props: { data: "auth", session, title: "TRIVIA", success },
      };
    }
);
