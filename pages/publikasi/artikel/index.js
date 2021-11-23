import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

// import Layout from "../../../components/templates/layout.component";
// import Artikel from "../../../components/content/publikasi/artikel/artikel";
// import ContentLoader from "react-content-loader"

import { getAllArtikel } from "../../../redux/actions/publikasi/artikel.actions";
import { wrapper } from "../../../redux/store";

// import LoadingPage from "../../../components/LoadingPage";
import LoadingSkeleton from "../../../components/LoadingSkeleton";


const Artikel = dynamic(
  () => import("../../../components/content/publikasi/artikel/artikel"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function ArtikelPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Artikel token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      // await store.dispatch(getAllArtikel(query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate))
      const session = await getSession({ req });
      const middleware = middlewareAuthAdminSession(session)
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            // destination: "http://dts-dev.majapahit.id/login/admin",
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getAllArtikel(
          query.page,
          query.keyword,
          query.limit,
          query.publish,
          query.startdate,
          query.enddate,
          session.user.user.data.token
        )
      );
      // await store.dispatch(getAllKategori(session.user.user.data.token))
      return {
        props: { session, title: "Artikel - Publikasi" },
      };
    }
);
