import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

import { getAllRolePermission } from "../../../redux/actions/publikasi/role-permissions.action";
import { getAllArtikelPeserta } from "../../../redux/actions/publikasi/artikel-peserta.actions";
import { wrapper } from "../../../redux/store";

import LoadingSkeleton from "../../../components/LoadingSkeleton";

const ArtikelPeserta = dynamic(
  () =>
    import(
      "../../../components/content/publikasi/artikel-peserta/artikel-peserta"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function ArtikelPesertaPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ArtikelPeserta token={session.token} role={session.user.roles[0]} />
      </div>
    </>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
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

      const role = session.user.user.data.user.roles[0]

      await store.dispatch(
        getAllArtikelPeserta(
          role,
          // query.role,
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
        props: { session, title: "Artikel Peserta - Publikasi" },
      };
    }
);
