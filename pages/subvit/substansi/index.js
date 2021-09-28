import React from "react";

import dynamic from "next/dynamic";
// import Layout from "../../../components/templates/layout.component";
// import LoadingPage from "../../../components/LoadingPage";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import ListSubstansi from "../../../components/content/subvit/substansi/list-substansi";

import { getAllSubtanceQuestionBanks } from "../../../redux/actions/subvit/subtance.actions";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

export default function Substansi(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListSubstansi token={session.token} />
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
            destination: "/",
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getAllSubtanceQuestionBanks(
          query.page,
          query.keyword,
          query.limit,
          session.user.user.data.token
        )
      );

      return {
        props: { session, title: "List Tes Substansi - Subvit" },
      };
    }
);
