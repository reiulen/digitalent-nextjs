import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
// import ListReport from "../../../components/content/pelatihan/report/list-report";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

import { listsReportTraining } from "../../../redux/actions/pelatihan/report-training.actions";
import {
  dropdownAkademi,
  dropdownTema,
  dropdownPenyelenggara,
} from "../../../redux/actions/pelatihan/function.actions";
import { getAllPermission } from "../../../redux/actions/utils/utils.actions";

const ListReport = dynamic(
  () => import("../../../components/content/pelatihan/report/list-report"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function ListReportPage(props) {
  const session = props.session.user.user.data;

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListReport token={session.token} />
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
      await store.dispatch(listsReportTraining(session.user.user.data.token));
      await store.dispatch(dropdownAkademi(session.user.user.data.token));
      await store.dispatch(dropdownTema(session.user.user.data.token));
      await store.dispatch(dropdownPenyelenggara(session.user.user.data.token));
      await store.dispatch(getAllPermission(session.user.user.data.token));

      return {
        props: { session, title: "List Report - Pelatihan" },
      };
    }
);
