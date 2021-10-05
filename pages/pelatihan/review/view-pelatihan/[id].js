import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import ViewReviewTraining from "../../../../components/content/pelatihan/review/view/view-data-training";

import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

export default function ViewReviewTrainingPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ViewReviewTraining />
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
        props: { session, title: "View Data Pelatihan - Pelatihan" },
      };
    }
);
