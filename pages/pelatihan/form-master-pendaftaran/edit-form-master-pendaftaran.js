import React from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const EditForm = dynamic(
  () =>
    import(
      "../../../components/content/pelatihan/master-pendaftaran/edit-master-pelatihan"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
import { wrapper } from "../../../redux/store";
import { getDetailMasterPelatihan } from "../../../redux/actions/pelatihan/master-pendaftaran.action";
import { getAllDataReference } from "../../../redux/actions/site-management/data-reference.actions";

export default function AddTrainingPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditForm token={session.token} />
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
      const token_permission = req.cookies.token_permission;

      await store.dispatch(
        getDetailMasterPelatihan(
          query.id,
          session.user.user.data.token,
          token_permission
        )
      );
      await store.dispatch(
        getAllDataReference(
          session.user.user.data.token,
          true,
          token_permission
        )
      );

      return {
        props: { session, title: "Edit Form Master Pendaftaran - Pelatihan" },
      };
    }
);
