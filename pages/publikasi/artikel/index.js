import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

import { getAllArtikel } from "../../../redux/actions/publikasi/artikel.actions";
import { getAllRolePermission } from "../../../redux/actions/publikasi/role-permissions.action"
import { wrapper } from "../../../redux/store";
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
      console.log("Cookies : ",req.cookies)
      const session = await getSession({ req });
      const middleware = middlewareAuthAdminSession(session)
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
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

      await store.dispatch(getAllRolePermission(session.user.user.data.token));
      
      return {
        props: { session, title: "Artikel - Publikasi" },
      };
    }
);
