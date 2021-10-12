import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
// import AddAcademy from "../../../components/content/pelatihan/academy/add-academy";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

const AddAcademy = dynamic(
  () => import("../../../components/content/pelatihan/academy/add-academy"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function AddAcademyPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <AddAcademy token={session.token} />
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
        props: { session, title: "Tambah Akademi - Pelatihan" },
      };
    }
);
