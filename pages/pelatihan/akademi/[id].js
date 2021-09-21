import React from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import EditAcademy from "../../../components/content/pelatihan/academy/edit-academy";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

export default function EditAcademyPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditAcademy />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, params, req }) => {
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
        props: { session, title: "Edit Akademi - Pelatihan" },
      };
    }
);
