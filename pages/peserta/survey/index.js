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
import { getAllAkademi } from "../../../redux/actions/beranda/beranda.actions";

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
      <Layout title="Survey" session={session}>
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

      if (query.id) {
        //jika ada query id
        const data = await store.dispatch(
          getDetailRiwayatPelatihan(query.id, session.user.user.data.user.token)
        );
        if (data) {
          if (data?.data?.status.includes("administrasi akhir")) {
            success = true;
          } else {
            success = false;
          }
        } else {
          success = false;
        }
      } else {
        // jika gak ada gw cek di dashboard ada gak status tes substansi?
        const dataDashboard = await store.dispatch(
          getDashboardPeserta(session?.user.user.data.user.token)
        );
        const status =
          dataDashboard?.data.pelatihan.pelatihan_berjalan.status || "";

        if (!status || status == "") {
          success = false;
        } else if (status?.includes("administrasi akhir")) {
          await store.dispatch(
            getDetailRiwayatPelatihan(
              dataDashboard?.data.pelatihan.pelatihan_berjalan.id,
              session.user.user.data.user.token
            )
          );
          success = true;
        } else {
          //jika gak ada gw cek di riwayat pelatihan ada gak datanya
          const { data } = await store.dispatch(
            getAllRiwayatPelatihanPeserta(session?.user.user.data.user.token)
          );
          success = false;
          const list = data.list.filter((item) => {
            return item.status.includes("administrasi akhir");
          });
          if (list.length == 0 || !list) {
            success = false;
          } else {
            await store.dispatch(
              getDetailRiwayatPelatihan(
                list[0].id,
                session.user.user.data.user.token
              )
            );
            success = true;
          }
        }
      }
      await store.dispatch(getDataPribadi(session.user.user.data.user.token));
      await store.dispatch(getAllAkademi());

      return {
        props: { data: "auth", session, title: "Dashboard - Peserta", success },
      };
    }
);
