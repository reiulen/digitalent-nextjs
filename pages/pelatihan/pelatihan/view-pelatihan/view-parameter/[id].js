import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
// import ViewTraining from "../../../../../components/content/pelatihan/training/view/view-training-step4";

import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";

const ViewTraining = dynamic(
  () =>
    import(
      "../../../../../components/content/pelatihan/training/view/view-training-step4"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

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
            destination: "/login/admin",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "View Parameter - Pelatihan" },
      };
    }
);
