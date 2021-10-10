import React from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
// import EditAcademy from "../../../components/content/pelatihan/academy/edit-academy";
import { getDetailAcademy } from "../../../redux/actions/pelatihan/academy.actions";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

const EditAcademy = dynamic(
  () => import("../../../components/content/pelatihan/academy/edit-academy"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function EditAcademyPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditAcademy token={session.token} />
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
            destination: "http://dts-dev.majapahit.id/",
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getDetailAcademy(params.id, session.user.user.data.token)
      );

      return {
        props: { session, title: "Edit Akademi - Pelatihan" },
      };
    }
);
