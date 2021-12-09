import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

import Layout from "../../../components/templates/layout.component";

import { getAllImagetron } from "../../../redux/actions/publikasi/imagetron.actions";
import { wrapper } from "../../../redux/store";

import { getAllRolePermission } from "../../../redux/actions/publikasi/role-permissions.action"
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const Imagetron = dynamic(
  () => import("../../../components/content/publikasi/imagetron/imagetron"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function ImagetronPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Imagetron token={session.token} />
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
        getAllImagetron(
          query.page,
          query.keyword,
          query.limit,
          query.publish,
          query.startdate,
          query.enddate,
          session.user.user.data.token,
          req.cookies.token_permission
        )
      );
      await store.dispatch(getAllRolePermission(session.user.user.data.token, req.cookies.token_permission));

      return {
        props: { session, title: "Imagetron - Publikasi" },
      };
    }
);
