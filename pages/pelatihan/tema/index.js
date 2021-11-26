import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
// import ListTheme from "../../../components/content/pelatihan/theme/list-theme";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
import { getAllTheme } from "../../../redux/actions/pelatihan/theme.actions";
import { dropdownAkademi } from "../../../redux/actions/pelatihan/function.actions";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

import { getAllPermission } from "../../../redux/actions/utils/utils.actions";

const ListTheme = dynamic(
  () => import("../../../components/content/pelatihan/theme/list-theme"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function ListThemePage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListTheme token={session.token} />
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
        getAllTheme(
          query.page,
          query.keyword,
          query.akademi,
          query.status,
          query.limit,
          session.user.user.data.token
        )
      );
      await store.dispatch(dropdownAkademi(session.user.user.data.token));
      await store.dispatch(getAllPermission(session.user.user.data.token));

      return {
        props: { session, title: "List Tema - Pelatihan" },
      };
    }
);
