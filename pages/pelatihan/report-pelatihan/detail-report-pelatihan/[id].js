import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
// import DetailReport from "../../../../components/content/pelatihan/report/detail-report";

import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

const DetailReport = dynamic(
  () => import("../../../../components/content/pelatihan/report/detail-report"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function DetailReportPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DetailReport />
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
            destination: "http://dts-dev.majapahit.id/login/admin",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Detail Report - Pelatihan" },
      };
    }
);
