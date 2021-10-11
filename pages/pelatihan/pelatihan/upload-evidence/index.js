import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
// import UploadEvidence from "../../../../components/content/pelatihan/training/upload-evidence";

import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

const UploadEvidence = dynamic(
  () =>
    import("../../../../components/content/pelatihan/training/upload-evidence"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function UploadEvidencePage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <UploadEvidence />
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
            destination: "/login/admin",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Upload Evidence - Pelatihan" },
      };
    }
);
