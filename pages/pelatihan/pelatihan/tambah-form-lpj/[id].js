import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
// import AddFormLpj from "../../../../components/content/pelatihan/training/add-form-lpj";

import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

const AddFormLpj = dynamic(
  () =>
    import("../../../../components/content/pelatihan/training/add-form-lpj"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function AddFormLpjPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <AddFormLpj />
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
        props: { session, title: "Tambah Form LPJ - Pelatihan" },
      };
    }
);
