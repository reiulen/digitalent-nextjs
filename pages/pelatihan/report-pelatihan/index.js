import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import ListReport from "../../../components/content/pelatihan/report/list-report";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

export default function ListReportPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListReport />
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
        props: { session, title: "List Report - Pelatihan" },
      };
    }
);
