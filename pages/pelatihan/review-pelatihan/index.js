import React from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
// import ListReview from "../../../components/content/pelatihan/review/list-review";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
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
import { getAllPermission } from "../../../redux/actions/utils/utils.actions";

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
      const Permission = await store.dispatch(
        getAllPermission(session.user.user.data.token)
      );

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
          session.user.user.data.token,
          Permission?.data?.tokenPermission
        )
      );
      const data = await store.dispatch(
        getCardReview(
          session.user.user.data.token,
          Permission?.data?.tokenPermission
        )
      );

      await store.dispatch(
        dropdownAkademi(
          session.user.user.data.token,
          Permission?.data?.tokenPermission
        )
      );

      await store.dispatch(
        dropdownTema(
          session.user.user.data.token,
          Permission?.data?.tokenPermission
        )
      );

      await store.dispatch(
        dropdownPenyelenggara(
          session.user.user.data.token,
          Permission?.data?.tokenPermission
        )
      );

      return {
        props: { session, title: "List Review Pelatihan - Pelatihan" },
      };
    }
);
