import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
// import EditRegistration from "../../../../../components/content/pelatihan/training/edit/edit-registration-step2";

import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";

const EditRegistration = dynamic(
  () =>
    import(
      "../../../../../components/content/pelatihan/training/edit/edit-registration-step2"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function EditRegistrationPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditRegistration />
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
        props: { session, title: "Edit Registrasi - Pelatihan" },
      };
    }
);
