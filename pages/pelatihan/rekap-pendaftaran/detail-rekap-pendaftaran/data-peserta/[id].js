import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
// import DataParticipant from "../../../../../components/content/pelatihan/summary/data-participant";

import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";

const DataParticipant = dynamic(
  () =>
    import(
      "../../../../../components/content/pelatihan/summary/data-participant"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function DataParticipantPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DataParticipant />
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
            destination: "http://dts-dev.majapahit.id/",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Data Peserta - Pelatihan" },
      };
    }
);
