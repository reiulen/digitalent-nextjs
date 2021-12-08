import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

import { getDetailArtikel } from "../../../../redux/actions/publikasi/artikel.actions";
import { getAllKategori } from "../../../../redux/actions/publikasi/kategori.actions";
import { wrapper } from "../../../../redux/store";

import LoadingPage from "../../../../components/LoadingPage";
import { getSettingPublikasi } from "../../../../redux/actions/publikasi/setting.actions";
import { getAllAkademi } from "../../../../redux/actions/beranda/beranda.actions";
import { getAllRolePermission } from "../../../../redux/actions/publikasi/role-permissions.action"

const EditArtikel = dynamic(
  () => import("../../../../components/content/publikasi/artikel/edit"),
  {
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

export default function EditArtikelPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditArtikel token={session.token} idUser={session.user.id} />
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
      await store.dispatch(
        getDetailArtikel(query.id, session.user.user.data.token)
      );
      await store.dispatch(getAllKategori(session.user.user.data.token));
      await store.dispatch(getSettingPublikasi(session.user.user.data.token));
      await store.dispatch(getAllAkademi(session.user.user.data.token));
      await store.dispatch(getAllRolePermission(session.user.user.data.token));

      return {
        props: { session, title: "Ubah Artikel - Publikasi" },
      };
    }
);