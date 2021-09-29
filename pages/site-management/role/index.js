import React from "react";

import dynamic from "next/dynamic";
// import Layout from "../../../components/templates/layout.component";
// import LoadingPage from "../../../components/LoadingPage";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import ListRole from "../../../components/content/site-management/role/list-role";

import { getAllRoles } from "../../../redux/actions/site-management/role.actions";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

export default function Substansi(props) {
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
      if (!session) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getAllRoles(
          query.page,
          query.keyword,
          query.limit,
          session.user.user.data.token
        )
      );

      return {
        props: { session, title: "List Role - Site Management" },
      };
    }
);
