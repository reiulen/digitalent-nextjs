import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

import { getDataPribadi } from "../../../../redux/actions/pelatihan/function.actions";
import { getDashboardPeserta } from "../../../../redux/actions/pelatihan/dashboard-peserta.actions";
import LoadingContent from "../../../../user-component-new/components/loader/LoadingContent";
import { useRouter } from "next/router";
import { wrapper } from "../../../../redux/store";
import { getAllAkademi } from "../../../../redux/actions/beranda/beranda.actions";
import { getAllKategori } from "../../../../redux/actions/publikasi/kategori.actions";
import { middlewareAuthPesertaSession } from "../../../../utils/middleware/authMiddleware";
import { getDetailArtikelsPeserta } from "../../../../redux/actions/publikasi/artikel.actions";

const EditArtikelPeserta = dynamic(
  () => import("../../../../user-component-new/content/peserta/artikel/edit"),
  {
    loading: function loadingNow() {
      return <LoadingContent />;
    },
    ssr: false,
  }
);

const Layout = dynamic(() =>
  import(
    "../../../../user-component-new/components/template/Layout-peserta.component"
  )
);

export default function EditArtikel(props) {
  const session = props.session.user.user.data.user;
  return (
    <>
      <Layout title="Edit Artikel" session={session}>
        <EditArtikelPeserta session={session} success={props.success} />
      </Layout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
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
      if (session) {
        const dataPribadi = await store.dispatch(
          getDataPribadi(session?.user.user.data.user.token)
        );
        if (dataPribadi.data.status == false || !dataPribadi.data.status) {
          success = false;
        } else {
          success = true;
        }
      }

      await store.dispatch(
        getDetailArtikelsPeserta(params.id, session?.user.user.data.user.token)
      );
      await store.dispatch(getAllKategori(session.user.user.data.Token));
      await store.dispatch(getAllAkademi(session.user.user.data.Token));

      return {
        props: {
          data: "auth",
          session,
          title: "Edit Artikel",
        },
      };
    }
);
