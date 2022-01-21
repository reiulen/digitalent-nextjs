import dynamic from "next/dynamic";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import LoadingContent from "../../../user-component-new/components/loader/LoadingContent";
import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";

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
      <Layout title="Favorit" session={session}>
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

      await store.dispatch(getDataPribadi(session?.user.user.data.user.token));

      const data = await store.dispatch(
        getAllBookmark(session?.user.user.data.user.token)
      );

      return {
        props: { data: "auth", session, title: "Dashboard - Peserta" },
      };
    }
);
