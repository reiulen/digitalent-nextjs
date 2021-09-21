import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import AddTraining from "../../../../components/content/pelatihan/training/insert/add-training-step1";

import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

export default function AddTrainingPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <AddTraining />
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
            destination: "/",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Tambah Pelatihan - Pelatihan" },
      };
    }
);
