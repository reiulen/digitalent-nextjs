import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";
import { getDetailRiwayatPelatihan } from "../../../redux/actions/pelatihan/riwayat-pelatihan.actions";
import { getAllAkademi } from "../../../redux/actions/beranda/beranda.actions";

const TestSubstansi = dynamic(
  () => import("../../../user-component/content/peserta/test-substansi"),
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
      <Layout title="Test Substansi" session={session}>
        <TestSubstansi session={session} />
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

      await store.dispatch(getDataPribadi(session.user.user.data.user.token));
      await store.dispatch(getAllAkademi());

      return {
        props: { data: "auth", session, title: "Dashboard - Peserta" },
      };
    }
);
