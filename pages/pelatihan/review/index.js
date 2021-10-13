import React from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
// import ListReview from "../../../components/content/pelatihan/review/list-review";
import {
  getAllListReview,
  getCardReview,
} from "../../../redux/actions/pelatihan/review.actions";
import {
  dropdownAkademi,
  dropdownTema,
  dropdownPenyelenggara,
} from "../../../redux/actions/pelatihan/function.actions";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

const ListReview = dynamic(
  () => import("../../../components/content/pelatihan/review/list-review"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function ListReviewPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListReview token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
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
        getAllListReview(
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
      await store.dispatch(getCardReview(session.user.user.data.token));
      await store.dispatch(dropdownAkademi(session.user.user.data.token));
      await store.dispatch(dropdownTema(session.user.user.data.token));
      await store.dispatch(dropdownPenyelenggara(session.user.user.data.token));

      return {
        props: { session, title: "List Review Pelatihan - Pelatihan" },
      };
    }
);
