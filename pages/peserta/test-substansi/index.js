import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";
import { getDetailRiwayatPelatihan } from "../../../redux/actions/pelatihan/riwayat-pelatihan.actions";

const TestSubstansi = dynamic(
  () => import("../../../user-component/content/peserta/test-substansi"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);
const TesSubstansiDetail = dynamic(
  () =>
    import(
      "../../../user-component/content/peserta/test-substansi/test-substansi-detail"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const Layout = dynamic(() =>
  import("../../../user-component/components/template/Layout.component")
);

export default function TestSubstansiPage(props) {
  const session = props.session.user.user.data.user;
  return (
    <>
      <Layout title="Dashboard Peserta - Pelatihan" session={session}>
        <TesSubstansiDetail session={session} />
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
        getDetailRiwayatPelatihan(
          query.id || req.cookies.id_pelatihan,
          session.user.user.data.user.token
        )
      );
      await store.dispatch(getDataPribadi(session.user.user.data.user.token));

      return {
        props: { data: "auth", session, title: "Dashboard - Peserta" },
      };
    }
);
