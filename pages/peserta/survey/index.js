import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import {
  getAllRiwayatPelatihanPeserta,
  getDetailRiwayatPelatihan,
} from "../../../redux/actions/pelatihan/riwayat-pelatihan.actions";
import { getDashboardPeserta } from "../../../redux/actions/pelatihan/dashboard-peserta.actions";

const SurveyPage = dynamic(
  () => import("../../../user-component-new/content/peserta/survey"),
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
      <Layout title="Survey " session={session}>
        {props.success ? <SurveyPage session={session} /> : <BelumTersedia />}
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
      console.log(status);
      if (!status || status == "") {
        success = false;
      } else if (status.includes("administrasi akhir")) {
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

      await store.dispatch(getDataPribadi(session.user.user.data.user.token));

      return {
        props: { data: "auth", session, title: "Dashboard - Peserta", success },
      };
    }
);
