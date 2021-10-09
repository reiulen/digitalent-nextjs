import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import ListTraining from "../../../components/content/pelatihan/training/list-training";

import { getAllTraining } from "../../../redux/actions/pelatihan/training.actions";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

export default function ListTrainingPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListTraining token={session.token} />
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
        getAllTraining(
          query.page,
          query.keyword,
          query.limit,
          query.pendaftaran_mulai,
          query.pelatihan_mulai,
          query.status_substansi,
          query.status_pelatihan,
          query.penyelenggara,
          query.akademi,
          query.tema,
          session.user.user.data.token
        )
      );

      return {
        props: { session, title: "List Pelatihan - Pelatihan" },
      };
    }
);
