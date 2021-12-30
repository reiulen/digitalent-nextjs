import React from "react";
import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";

import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import { wrapper } from "../../../../redux/store";
import { getDetailReportTraining } from "../../../../redux/actions/pelatihan/report-training.actions";

const DetailReport = dynamic(
  () => import("../../../../components/content/pelatihan/report/detail-report"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function DetailReportPage(props) {
  const session = props.session.user.user.data;

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DetailReport token={session.token} />
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

      const token_permission = req.cookies.token_permission;

      await store.dispatch(
        getDetailReportTraining(
          session.user.user.data.token,
          query.id,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          token_permission
        )
      );
      return {
        props: { session, title: "Detail Report - Pelatihan" },
      };
    }
);
