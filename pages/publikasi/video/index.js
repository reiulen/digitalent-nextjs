import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

import { filterCard, getAllVideo } from "../../../redux/actions/publikasi/video.actions";
import { wrapper } from "../../../redux/store";
import { getAllRolePermission } from "../../../redux/actions/publikasi/role-permissions.action"
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const Vidio = dynamic(
  () => import("../../../components/content/publikasi/vidio/vidio"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function VidioPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Vidio token={session.token} />
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
        getAllVideo(
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
        props: { session, title: "Video - Publikasi" },
      };
    }
);