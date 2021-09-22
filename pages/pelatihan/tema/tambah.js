import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import AddTheme from "../../../components/content/pelatihan/theme/add-theme";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

export default function AddThemePage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <AddTheme />
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
        props: { session, title: "Tambah Tema - Pelatihan" },
      };
    }
);
