import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
// import EditTraining from "../../../../components/content/pelatihan/training/edit/edit-training-step1";

import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

const EditTraining = dynamic(
  () =>
    import(
      "../../../../components/content/pelatihan/training/edit/edit-training-step1"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function EditTrainingPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditTraining />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req, params }) => {
      const session = await getSession({ req });
      console.log(params);
      if (!session) {
        return {
          redirect: {
            destination: "http://dts-dev.majapahit.id/",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Edit Pelatihan - Pelatihan" },
      };
    }
);
