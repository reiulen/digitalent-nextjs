import React from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { getPendaftaranPeserta } from "../../../../../redux/actions/pelatihan/summary.actions";
import { middlewareAuthAdminSession } from "../../../../../utils/middleware/authMiddleware";

import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";

const DataParticipant = dynamic(
  () =>
    import(
      "../../../../../components/content/pelatihan/summary/data-participant"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function DataParticipantPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DataParticipant token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req, params }) => {
      const session = await getSession({ req });
      const middleware = middlewareAuthAdminSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getPendaftaranPeserta(
          session.user.user.data.token,
          query.pelatihan_id,
          "",
          1,
          query.index
        )
      );
      // await store.dispatch(
      //   getReminderBerkas(session.user.user.data.token, params.id)
      // );
      // await store.dispatch(
      //   getRiwayatPelatihan(session.user.user.data.token, params.id)
      // );
      // await store.dispatch(
      //   getBerkasPendaftaran(session.user.user.data.token, params.id)
      // );
      // await store.dispatch(
      //   getFormKomitmen(session.user.user.data.token, params.id)
      // );
      // await store.dispatch(getFormLpj(session.user.user.data.token, params.id));

      return {
        props: { session, title: "Data Peserta - Pelatihan" },
      };
    }
);
