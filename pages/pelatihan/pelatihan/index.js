import React from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

import {
  getAllTraining,
  getCardTraining,
} from "../../../redux/actions/pelatihan/training.actions";
import {
  dropdownAkademi,
  dropdownTema,
  dropdownPenyelenggara,
} from "../../../redux/actions/pelatihan/function.actions";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { getAllPermission } from "../../../redux/actions/utils/utils.actions";

const ListTraining = dynamic(
  () => import("../../../components/content/pelatihan/training/list-training"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function ListTrainingPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListTraining token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
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
        // getAllTraining(
        //   query.page,
        //   query.keyword,
        //   query.limit,
        //   query.pendaftaran_mulai,
        //   query.pelatihan_mulai,
        //   query.status_substansi,
        //   query.status_pelatihan,
        //   query.penyelenggara,
        //   query.akademi,
        //   query.tema,
        //   session.user.user.data.token
        // )
        getAllTraining(
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          session.user.user.data.token
        )
      );

      await store.dispatch(getCardTraining(session.user.user.data.token));
      await store.dispatch(dropdownAkademi(session.user.user.data.token));
      await store.dispatch(dropdownTema(session.user.user.data.token));
      await store.dispatch(dropdownPenyelenggara(session.user.user.data.token));

      await store.dispatch(getAllPermission(session.user.user.data.token));

      return {
        props: { session, title: "List Pelatihan - Pelatihan" },
      };
    }
);
