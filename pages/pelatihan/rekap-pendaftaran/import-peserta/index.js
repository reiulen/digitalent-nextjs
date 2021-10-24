import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

const ImportSummary = dynamic(
  () =>
    import(
      "../../../../components/content/pelatihan/summary/import-participant"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function ImportSummaryPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ImportSummary />
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
        props: { session, title: "Import Peserta - Pelatihan" },
      };
    }
);
