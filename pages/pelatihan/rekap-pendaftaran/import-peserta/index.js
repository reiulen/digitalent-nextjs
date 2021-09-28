import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import ImportSummary from "../../../../components/content/pelatihan/summary/import-participant";

import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

export default function ImportSummaryPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ImportSummary />
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
        props: { session, title: "Import Peserta - Pelatihan" },
      };
    }
);
