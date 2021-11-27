import dynamic from "next/dynamic";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

// import Layout from "../../../components/templates/layout.component";
// import Tambah from "../../../components/content/publikasi/imagetron/tambah";

import LoadingPage from "../../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { getAllKategori } from "../../../../redux/actions/publikasi/kategori.actions";
import { wrapper } from "../../../../redux/store";
import { getSettingPublikasi } from "../../../../redux/actions/publikasi/setting.actions";
import { getAllRolePermission } from "../../../../redux/actions/publikasi/role-permissions.action"

const Tambah = dynamic(
  () => import("../../../../components/content/publikasi/imagetron/tambah"),
  {
    // suspense: true,
    // loading: () => <LoadingSkeleton />,
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
        <Tambah token={session.token} id={session.user.id} />
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

      await store.dispatch(getAllKategori(session.user.user.data.token));
      await store.dispatch(getSettingPublikasi(session.user.user.data.token));
      await store.dispatch(getAllRolePermission(session.user.user.data.token));

      return {
        props: { session, title: "Tambah Imagetron - Publikasi" },
      };
    }
);
