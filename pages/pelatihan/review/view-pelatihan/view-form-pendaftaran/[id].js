import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
// import ViewFormRegister from "../../../../../components/content/pelatihan/review/view/view-form-register";

import { wrapper } from "../../../../../redux/store";
import { getSession } from "next-auth/client";

import {
  getListRevisi,
  getReviewStep2Revisi,
} from "../../../../../redux/actions/pelatihan/review.actions";

const ViewFormRegister = dynamic(
  () =>
    import(
      "../../../../../components/content/pelatihan/review/view/view-form-register"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function ViewFormRegisterPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ViewFormRegister token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req, params }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "http://dts-dev.majapahit.id/login/admin",
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getListRevisi(session.user.user.data.token, params.id)
      );
      await store.dispatch(
        getReviewStep2Revisi(session.user.user.data.token, params.id)
      );

      return {
        props: { session, title: "View Form Register - Pelatihan" },
      };
    }
);
