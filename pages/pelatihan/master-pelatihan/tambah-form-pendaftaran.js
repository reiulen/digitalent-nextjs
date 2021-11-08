import React from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

import { getCardTraining } from "../../../redux/actions/pelatihan/training.actions";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

const InsertTraining = dynamic(
  () =>
    import(
      "../../../components/content/pelatihan/master-pelatihan/insert-pelatihan.jsx"
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
        <InsertTraining token={session.token} />
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

      await store.dispatch(getCardTraining(session.user.user.data.token));

      return {
        props: { session, title: "List Pelatihan - Pelatihan" },
      };
    }
);
