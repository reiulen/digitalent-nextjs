import React from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

import { getReviewStep1Revisi } from "../../../../redux/actions/pelatihan/review.actions";

const ViewTraining = dynamic(
  () =>
    import(
      "../../../../components/content/pelatihan/summary/view/view-training-step1"
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
      const middleware = middlewareAuthAdminSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getReviewStep1Revisi(session.user.user.data.token, params.id)
      );

      return {
        props: { session, title: "View Rekap Pendaftaran - Pelatihan" },
      };
    }
);
