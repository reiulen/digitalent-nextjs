import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
// import ViewReviewCommitment from "../../../../../components/content/pelatihan/review/view/view-form-commitment";

import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";

const ViewReviewCommitment = dynamic(
  () =>
    import(
      "../../../../../components/content/pelatihan/review/view/view-form-commitment"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function ViewReviewCommitmentPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ViewReviewCommitment />
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
        props: { session, title: "View Form Komitmen - Pelatihan" },
      };
    }
);
