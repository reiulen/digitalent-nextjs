import React from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

import {
  getStatusPendaftar,
  getAkademiByPelatihan,
  getPendaftaranPeserta,
} from "../../../redux/actions/pelatihan/summary.actions";

const DaftarPeserta = dynamic(
  () =>
    import(
      "../../../components/content/daftar-peserta-kabadan/peserta-pelatihan/daftar-peserta-pelatihan"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function DaftarPesertaPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DaftarPeserta token={session.token} />
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
        getStatusPendaftar(session.user.user.data.token, query.id)
      );
      await store.dispatch(
        getAkademiByPelatihan(session.user.user.data.token, query.id)
      );
      await store.dispatch(
        getPendaftaranPeserta(session.user.user.data.token, query.id)
      );

      return {
        props: { session, title: "Detail Rekap Pendaftaran - Pelatihan" },
      };
    }
);
