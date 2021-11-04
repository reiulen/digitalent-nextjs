import React from "react";

import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import { wrapper } from "../../../../redux/store";
import { getFormEvidence } from '../../../../redux/actions/pelatihan/training.actions'

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

export default function UploadEvidencePage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <UploadEvidence token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
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

      await store.dispatch(getFormEvidence(session.user.user.data.token, query.id))

      return {
        props: { session, title: "Upload Evidence - Pelatihan" },
      };
    }
);
