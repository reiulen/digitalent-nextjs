import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

import { getDetailArtikelPeserta } from "../../../../redux/actions/publikasi/artikel-peserta.actions";
import { getAllKategori } from "../../../../redux/actions/publikasi/kategori.actions";
import { wrapper } from "../../../../redux/store";

import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getSettingPublikasi } from "../../../../redux/actions/publikasi/setting.actions";
import { getAllAkademi } from "../../../../redux/actions/beranda/beranda.actions";
import { getAllRolePermission } from "../../../../redux/actions/publikasi/role-permissions.action"

const EditArtikel = dynamic(
  () => import("../../../../components/content/publikasi/artikel-peserta/edit"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function EditArtikelPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditArtikel token={session.token} />
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
        getDetailArtikelPeserta(query.id, session.user.user.data.token, req.cookies.token_permission)
      );
      await store.dispatch(getAllKategori(session.user.user.data.token, req.cookies.token_permission));
      await store.dispatch(getSettingPublikasi(session.user.user.data.token, req.cookies.token_permission));
      await store.dispatch(getAllAkademi(session.user.user.data.token, req.cookies.token_permission));
      await store.dispatch(getAllRolePermission(session.user.user.data.token, req.cookies.token_permission));

      return {
        props: { session, title: "Ubah Artikel Peserta - Publikasi" },
      };
    }
);