import dynamic from "next/dynamic";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import { getDashboardPeserta } from "../../../redux/actions/pelatihan/dashboard-peserta.actions";
import LoadingContent from "../../../user-component/content/peserta/components/loader/LoadingContent";
import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";
import {
  getAllBerandaArtikel,
  getKategoriBerandaArtikel,
  getTagBerandaArtikel,
} from "../../../redux/actions/beranda/artikel.actions";
import {
  getAllPelatihanByAkademi,
  getDetailAkademi,
} from "../../../redux/actions/beranda/detail-akademi.actions";
import { getAllBookmark } from "../../../redux/actions/pelatihan/bookmark.action";

const Bookmark = dynamic(
  () => import("../../../user-component-new/content/peserta/bookmark/index"),
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

export default function BookmarkPage(props) {
  const session = props.session.user.user.data.user;
  return (
    <>
      <Layout title="Artikel" session={session}>
        <Bookmark session={session} success={props.success} />
      </Layout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req, params }) => {
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
        getDashboardPeserta(session?.user.user.data.user.token)
      );

      const data = await store.dispatch(
        getAllBookmark(session?.user.user.data.user.token)
      );

      await store.dispatch(getDataPribadi(session));

      await store.dispatch(getDetailAkademi(4));

      await store.dispatch(
        getAllPelatihanByAkademi(
          4,
          query.tema_id,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          1
        )
      );

      await store.dispatch(
        getAllBerandaArtikel(
          query.page,
          query.keyword,
          query.limit,
          query.filterPublish,
          query.sort,
          query.category_id,
          query.category_name,
          query.category_akademi,
          query.tag
        )
      );
      return {
        props: { data: "auth", session, title: "Dashboard - Peserta", success },
      };
    }
);
