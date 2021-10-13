import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
// import DetailSummary from "../../../../components/content/pelatihan/summary/detail-summary";

import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

const DetailSummary = dynamic(
  () =>
    import("../../../../components/content/pelatihan/summary/detail-summary"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

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
            destination: "http://dts-dev.majapahit.id/login/admin",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Detail Rekap Pendaftaran - Pelatihan" },
      };
    }
);
