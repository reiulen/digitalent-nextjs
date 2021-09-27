import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import ViewFormRegister from "../../../../../components/content/pelatihan/review/view/view-form-register";

import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";

export default function ViewFormRegisterPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ViewFormRegister />
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
            destination: "/",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "View Form Register - Pelatihan" },
      };
    }
);