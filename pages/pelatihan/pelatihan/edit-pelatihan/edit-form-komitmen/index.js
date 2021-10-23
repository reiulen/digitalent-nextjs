import React from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";

import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";

import { middlewareAuthAdminSession } from "../../../../../utils/middleware/authMiddleware";

const EditCommitment = dynamic(
  () =>
    import(
      "../../../../../components/content/pelatihan/training/edit/edit-commitment-step3"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function EditCommitmentPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditCommitment />
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

      return {
        props: { session, title: "Edit Form Komitmen - Pelatihan" },
      };
    }
);
