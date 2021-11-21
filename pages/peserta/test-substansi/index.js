import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";
import {
  getAllRiwayatPelatihanPeserta,
  getDetailRiwayatPelatihan,
} from "../../../redux/actions/pelatihan/riwayat-pelatihan.actions";
import { getAllAkademi } from "../../../redux/actions/beranda/beranda.actions";
import { getDashboardPeserta } from "../../../redux/actions/pelatihan/dashboard-peserta.actions";

const TesSubstansiDetail = dynamic(
  () =>
    import(
      "../../../user-component-new/content/peserta/test-substansi/test-substansi-detail"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
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

const Layout = dynamic(() =>
  import(
    "../../../user-component-new/components/template/Layout-peserta.component"
  )
);

export default function TestSubstansiPage(props) {
  const session = props.session.user.user.data.user;
  return (
    <>
      <Layout title="Test Substansi" session={session}>
        {props.success ? (
          <TesSubstansiDetail session={session} />
        ) : (
          <BelumTersedia />
        )}
      </Layout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
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
      // if (!req.cookies.id_pelatihan) {
      //   const { data } = await store.dispatch(
      //     getAllRiwayatPelatihanPeserta(session.user.user.data.user.token)
      //   );
      //   if (!data) {
      //     return (success = false);
      //   } else {
      //     const test_substansi = data.list.filter(
      //       (item) => item.status === "tes substansi"
      //     );
      //     if (test_substansi.length > 0) {
      //       await store.dispatch(
      //         getDetailRiwayatPelatihan(
      //           test_substansi[0].id,
      //           session.user.user.data.user.token
      //         )
      //       );
      //       success = true;
      //     } else {
      //       success = false;
      //     }
      //   }
      // } else {
      //   await store.dispatch(
      //     getDetailRiwayatPelatihan(
      //       req.cookies.id_pelatihan,
      //       session.user.user.data.user.token
      //     )
      //   );
      //   success = true;
      // }
      await store.dispatch(getDataPribadi(session.user.user.data.user.token));
      await store.dispatch(getAllAkademi());

      const { data } = await store.dispatch(
        getDashboardPeserta(session?.user.user.data.user.token)
      );
      const status = data.pelatihan.pelatihan_berjalan.status || "";
      if (!status || status == "") {
        success = false;
      } else if (
        status.includes("substansi" || "belum tersedia" || "belum mengerjakan")
      ) {
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

      return {
        props: { data: "auth", session, title: "Dashboard - Peserta", success },
      };
    }
);
