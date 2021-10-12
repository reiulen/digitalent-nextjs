import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
// import ListReview from "../../../components/content/pelatihan/review/list-review";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

const ListReview = dynamic(
  () => import("../../../components/content/pelatihan/review/list-review"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function ListReviewPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListReview />
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
        props: { session, title: "List Review Pelatihan - Pelatihan" },
      };
    }
);
