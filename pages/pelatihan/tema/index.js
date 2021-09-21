import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import ListTheme from "../../../components/content/pelatihan/theme/list-theme";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

export default function ListThemePage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListTheme />
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
        props: { session, title: "List Tema - Pelatihan" },
      };
    }
);
