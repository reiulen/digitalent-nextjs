import React from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { getAllListMasterPelatihan } from "../../../redux/actions/pelatihan/master-pendaftaran.action";
import { getAllPermission } from "../../../redux/actions/utils/utils.actions";

const MasterTraining = dynamic(
  () =>
    import(
      "../../../components/content/pelatihan/master-pendaftaran/list-pelatihan.jsx"
    ),
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
        <MasterTraining token={session.token} />
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
        getAllListMasterPelatihan(session.user.user.data.token)
      );
      await store.dispatch(getAllPermission(session.user.user.data.token));

      return {
        props: { session, title: "List Pelatihan - Pelatihan" },
      };
    }
);
