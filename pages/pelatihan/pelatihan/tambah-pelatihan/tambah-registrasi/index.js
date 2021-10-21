import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
// import AddRegistration from "../../../../../components/content/pelatihan/training/insert/add-registration-step2";

import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";

const AddRegistration = dynamic(
  () =>
    import(
      "../../../../../components/content/pelatihan/training/insert/add-registration-step2"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function AddRegistrationPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <AddRegistration />
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
            destination: "http://dts-dev.majapahit.id/login/admin",
            permanent: false,
          },
        };
      }

      return {
        props: { session, title: "Tambah Registrasi - Pelatihan" },
      };
    }
);
