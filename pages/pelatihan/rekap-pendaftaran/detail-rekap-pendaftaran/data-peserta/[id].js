import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import {
  getReminderBerkas,
  getDataPribadi,
  getRiwayatPelatihan,
  getBerkasPendaftaran,
  getFormKomitmen,
  getFormLpj,
} from "../../../../../redux/actions/pelatihan/summary.actions";
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

export default function DataParticipantPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DataParticipant />
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

      return {
        props: { session, title: "Data Peserta - Pelatihan" },
      };
    }
);
