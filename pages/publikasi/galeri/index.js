import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

// import Layout from "../../../components/templates/layout.component";
// import Galeri from "../../../components/content/publikasi/galeri/galeri";

import { getAllGaleri, getDetailGaleri } from "../../../redux/actions/publikasi/galeri.actions";
import { wrapper } from "../../../redux/store";

// import LoadingPage from "../../../components/LoadingPage";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const Galeri = dynamic(
  () => import("../../../components/content/publikasi/galeri/galeri"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function GaleriPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Galeri token={session.token} />
      </div>
    </>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      // await store.dispatch(getAllArtikel(query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate))
      const session = await getSession({ req });
      const middleware = middlewareAuthAdminSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getAllGaleri(
          query.page,
          query.keyword,
          query.limit,
          query.publish,
          query.startdate,
          query.enddate,
          session.user.user.data.token
        )
      );
      // await store.dispatch(
      //   getDetailGaleri(session.user.user.data.token)
      // );
      // await store.dispatch(getAllKategori(session.user.user.data.token))
      return {
        props: { session, title: "Galeri - Publikasi" },
      };
    }
);