import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
// import AddTraining from "../../../../components/content/pelatihan/training/insert/add-training-step1";
import IndexInsert from "../../../../components/content/pelatihan/training/insert/index-insert";

import {
  getTrainingStep1,
  getRegistrationStep2,
  getCommitmentStep3,
} from "../../../../redux/actions/pelatihan/function.actions";

import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

export default function AddTrainingPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <IndexInsert />
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
            destination: "http://dts-dev.majapahit.id/",
            permanent: false,
          },
        };
      }

      await store.dispatch(getTrainingStep1());
      await store.dispatch(getRegistrationStep2());
      await store.dispatch(getCommitmentStep3());

      return {
        props: { session, title: "Tambah Pelatihan - Pelatihan" },
      };
    }
);
