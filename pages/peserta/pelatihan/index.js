import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";
import { getAllAkademi } from "../../../redux/actions/beranda/beranda.actions";

const ListPelatihan = dynamic(
  () => import("../../../user-component/content/peserta/pelatihan"),
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

export default function ListPelatihanPage(props) {
  const session = props.session.user.user.data.user;
  return (
    <>
      <Layout title="Pelatihan Peserta - Pelatihan" session={session}>
        <ListPelatihan />
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
      await store.dispatch(getAllAkademi());

      return {
        props: { data: "auth", session, title: "Pelatihan - Peserta" },
      };
    }
);
