import React from "react";

import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { getReviewStep2Revisi } from "../../../redux/actions/pelatihan/review.actions";
import { wrapper } from "../../../redux/store";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

const ViewTraining = dynamic(
  () =>
    import(
      "../../../components/content/pelatihan/master-pelatihan/view-master-pelatihan-id"
      //   "../../../../../components/content/pelatihan/training/view/view-training-step2"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function ViewTrainingPage(props) {
  console.log(props);
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

      return {
        props: { session, title: "View Form Pendaftaran - Pelatihan" },
      };
    }
);
