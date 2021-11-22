import dynamic from "next/dynamic";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import LoadingContent from "../../../user-component/content/peserta/components/loader/LoadingContent";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";
import { getAllAkademi } from "../../../redux/actions/beranda/beranda.actions";

const Pengaturan = dynamic(
  () => import("../../../user-component-new/content/peserta/pengaturan/index"),
  {
    loading: function loadingNow() {
      return <LoadingContent />;
    },
    ssr: false,
  }
);

const Layout = dynamic(() =>
  import(
    "../../../user-component-new/components/template/Layout-peserta.component"
  )
);

export default function ProfilePage(props) {
  const session = props.session.user.user.data.user;
  return (
    <>
      <Layout title="Pengaturan - Pelatihan" session={session}>
        <Pengaturan session={session} />
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

      const data = session.user.user.data.user;

      await store.dispatch(getDataPribadi(data.token));
      await store.dispatch(getAllAkademi());

      return {
        props: { data: "auth", session, title: "Pengaturan - Peserta" },
      };
    }
);
