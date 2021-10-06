import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import ListAcademy from "../../../components/content/pelatihan/academy/list-academy";
import { getAllAcademy } from "../../../redux/actions/pelatihan/academy.actions";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

export default function ListAcademyPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListAcademy token={session.token} />
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
        getAllAcademy(
          query.page,
          query.keyword,
          query.limit,
          session.user.user.data.token
        )
      );

      return {
        props: { session, title: "List Akademi - Pelatihan" },
      };
    }
);
