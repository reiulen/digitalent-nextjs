import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

import { getSettingPublikasi } from "../../../redux/actions/publikasi/setting.actions";
import { wrapper } from "../../../redux/store";

import LoadingPage from "../../../components/LoadingPage";
import { getAllRolePermission } from "../../../redux/actions/publikasi/role-permissions.action"

const PengaturanPublikasi = dynamic(
  () => import("../../../components/content/publikasi/pengaturan/pengaturan"),
  { loading: () => <LoadingPage />, ssr: false }
);

export default function PengaturanPublikasiPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <PengaturanPublikasi token={session.token} />
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

      await store.dispatch(getSettingPublikasi(session.user.user.data.token));
      await store.dispatch(getAllRolePermission(session.user.user.data.token));

      return {
        props: { session, title: "Pengaturan - Publikasi" },
      };
    }
);
