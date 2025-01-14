import React from "react";
import dynamic from "next/dynamic";
import LoadingPage from "../../../components/LoadingPage";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { getAllRoles } from "../../../redux/actions/site-management/role.actions";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

const ListRole = dynamic(
  () => import("../../../components/content/site-management/role/list-role"),
  {
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

export default function RoleList(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListRole token={session.token} />
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

      await store.dispatch(getAllRoles(session.user.user.data.token, req.cookies.token_permission));

      return {
        props: { session, title: "List Role - Site Management" },
      };
    }
);
