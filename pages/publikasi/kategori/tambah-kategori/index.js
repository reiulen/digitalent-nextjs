import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

import LoadingPage from "../../../../components/LoadingPage";
import { wrapper } from "../../../../redux/store";
import { getAllKategori } from "../../../../redux/actions/publikasi/kategori.actions";
import { getAllRolePermission } from "../../../../redux/actions/publikasi/role-permissions.action"

const Tambah = dynamic(
  () => import("../../../../components/content/publikasi/kategori/tambah"),
  {
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

export default function TambahPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Tambah token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req }) => {
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

      await store.dispatch(getAllKategori(session.user.user.data.token, req.cookies.token_permission));
      await store.dispatch(getAllRolePermission(session.user.user.data.token, req.cookies.token_permission));

      return {
        props: { session, title: "Tambah Kategori - Publikasi" },
      };
    }
);