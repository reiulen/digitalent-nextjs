import React from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

import {
  getAllSubtanceQuestionBanks,
  getPermissionSubvit,
} from "../../../redux/actions/subvit/subtance.actions";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

const ListSubstansi = dynamic(
  () => import("../../../components/content/subvit/substansi/list-substansi"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function Substansi(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListSubstansi
          token={session.token}
          tokenPermission={props.permission}
        />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "http://dts-dev.majapahit.id/login/admin",
            permanent: false,
          },
        };
      }

      const middleware = middlewareAuthAdminSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

      const permission = req.cookies.token_permission;

      await store.dispatch(
        getAllSubtanceQuestionBanks(
          query.page,
          query.keyword,
          query.limit,
          session.user.user.data.token,
          permission
        )
      );

      await store.dispatch(
        getPermissionSubvit(session.user.user.data.token, permission)
      );

      return {
        props: { session, title: "List Test Substansi - Subvit", permission },
      };
    }
);
