import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import ListTheme from "../../../components/content/pelatihan/theme/list-theme";
import { getAllTheme } from "../../../redux/actions/pelatihan/theme.actions";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

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
      if (!session) {
        return {
          redirect: {
            destination: "http://dts-dev.majapahit.id/",
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

      return {
        props: { session, title: "List Tema - Pelatihan" },
      };
    }
);
