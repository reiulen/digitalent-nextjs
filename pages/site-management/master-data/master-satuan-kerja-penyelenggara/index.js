import React from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "/components/LoadingSkeleton";
import ListSatuanKerjaPenyelenggara from "/components/content/site-management/master-data/master-satuan-kerja-penyelenggara/list-satuan-keja-penyelenggara.jsx";

import { getAllMasterSatuanKerjaPenyelenggaras } from "/redux/actions/site-management/master-satuan-kerja-penyelenggara.actions";
import { wrapper } from "/redux/store";
import { getSession } from "next-auth/client";

export default function SatuanKerjaSama(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex.flex-column.flex-root">
        <ListSatuanKerjaPenyelenggara token={session.token} />
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
        getAllMasterSatuanKerjaPenyelenggaras(
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
