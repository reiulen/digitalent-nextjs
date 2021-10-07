import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import ViewTraining from "../../../../components/content/pelatihan/training/view/view-training-step1";

import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

export default function ViewTrainingPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ViewTraining />
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
        props: { session, title: "View Pelatihan - Pelatihan" },
      };
    }
);
