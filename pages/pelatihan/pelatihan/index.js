import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import ListTraining from "../../../components/content/pelatihan/training/list-training";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

export default function ListTrainingPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListTraining />
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

      return {
        props: { session, title: "List Pelatihan - Pelatihan" },
      };
    }
);
