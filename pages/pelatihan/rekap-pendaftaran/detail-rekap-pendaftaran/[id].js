import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import DetailSummary from "../../../../components/content/pelatihan/summary/detail-summary";

import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

export default function DetailSummaryPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DetailSummary />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req, params }) => {
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
        props: { session, title: "Detail Rekap Pendaftaran - Pelatihan" },
      };
    }
);
