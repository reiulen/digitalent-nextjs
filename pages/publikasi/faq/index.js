import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

import {
  getAllFaq,
  getAllFaqPagination,
} from "../../../redux/actions/publikasi/faq.actions";
import { wrapper } from "../../../redux/store";
import { getAllRolePermission } from "../../../redux/actions/publikasi/role-permissions.action"
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const FAQ = dynamic(
  () => import("../../../components/content/publikasi/faq/faq"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function FaqPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <FAQ token={session.token} />
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
        getAllFaqPagination(
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
        props: { session, title: "FAQ - Publikasi" },
      };
    }
);