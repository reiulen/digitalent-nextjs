import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import ListSummary from "../../../components/content/pelatihan/summary/list-summary";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

export default function ListSummaryPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListSummary />
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

      return {
        props: { session, title: "List Rekap Pendaftaran - Pelatihan" },
      };
    }
);
