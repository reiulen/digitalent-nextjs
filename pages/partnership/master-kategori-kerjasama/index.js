import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";
import { fetchAllMKCooporation } from "../../../redux/actions/partnership/mk_cooporation.actions";

import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
import { getPartnershipPermissions } from "../../../redux/actions/partnership/partnership_permission.actions"
const MasterKategoriKerjasama = dynamic(
  () =>
    import(
      "../../../components/content/partnership/master-kategori-kerjasama/masterKategoriKerjasama"
    ),
  { loading: () => <LoadingSkeleton />, ssr: false }
);

export default function KategoriKerjasama(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <MasterKategoriKerjasama token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
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
      // if (!session) {
      //   return {
      //     redirect: {
      //       destination: "http://dts-dev.majapahit.id/login/admin",
      //       permanent: false,
      //     },
      //   };
      // }

      await store.dispatch(fetchAllMKCooporation(session.user.user.data.token));
      await store.dispatch(getPartnershipPermissions(session.user.user.data.token))

      return {
        props: { session, title: "Master Kategori Kerjasama - Partnership" },
      };
    }
);
