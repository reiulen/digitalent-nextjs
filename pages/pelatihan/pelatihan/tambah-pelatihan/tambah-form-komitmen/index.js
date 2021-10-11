import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
// import AddCommitment from "../../../../../components/content/pelatihan/training/insert/add-commitment-step3";

import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";

const AddCommitment = dynamic(
  () =>
    import(
      "../../../../../components/content/pelatihan/training/insert/add-commitment-step3"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function AddCommitmentPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <AddCommitment />
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
            destination: "/login/admin",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Tambah Form Komitmen - Pelatihan" },
      };
    }
);
