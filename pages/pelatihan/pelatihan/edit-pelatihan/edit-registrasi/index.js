import React from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { middlewareAuthAdminSession } from "../../../../../utils/middleware/authMiddleware";

import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";
import { getAllDataReference } from "../../../../../redux/actions/site-management/data-reference.actions";
import { getEditTrainingStep2 } from "../../../../../redux/actions/pelatihan/training.actions";
import { drowpdownFormBuilder } from "../../../../../redux/actions/pelatihan/function.actions";

const EditRegistration = dynamic(
  () =>
    import(
      "../../../../../components/content/pelatihan/training/edit/edit-registration-step2"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function EditRegistrationPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditRegistration token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      const token_permission = req.cookies.token_permission;

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
        getAllDataReference(
          session.user.user.data.token,
          true,
          token_permission
        )
      );
      await store.dispatch(
        getEditTrainingStep2(
          query.id,
          session.user.user.data.token,
          token_permission
        )
      );
      await store.dispatch(drowpdownFormBuilder(session.user.user.data.token));

      return {
        props: { session, title: "Edit Registrasi - Pelatihan" },
      };
    }
);
