import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession, session } from "next-auth/client";
import { wrapper } from "../../../redux/store";
import {
  fetchAllMK,
  fetchListSelectMitra,
  fetchListSelectCooperation,
  fetchListSelectStatus,
} from "../../../redux/actions/partnership/managementCooporation.actions";

import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

import { getPartnershipPermissions } from "../../../redux/actions/partnership/partnership_permission.actions"

const Table = dynamic(
  () =>
    import("../../../components/content/partnership/kerjasama/tableKerjasama"),
  { loading: () => <LoadingSkeleton />, ssr: false }
);

export default function KerjaSamaPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Table token={session.token} />
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

      await store.dispatch(fetchAllMK(session.user.user.data.token));
      await store.dispatch(fetchListSelectMitra(session.user.user.data.token));
      await store.dispatch(
        fetchListSelectCooperation(session.user.user.data.token)
      );
      await store.dispatch(fetchListSelectStatus(session.user.user.data.token));
      await store.dispatch(getPartnershipPermissions(session.user.user.data.token))
        
      return {
        props: { session, title: "Kerjasama - Partnership" },
      };
    }
);
