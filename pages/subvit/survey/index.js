import React from "react";
import dynamic from "next/dynamic";

// import ListSurvey from '../../../components/content/subvit/survey/list-survey'
// import Layout from "../../../components/templates/layout.component";
// import LoadingPage from "../../../components/LoadingPage";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

import { getAllSurveyQuestionBanks } from "../../../redux/actions/subvit/survey-question.actions";
import { wrapper } from "../../../redux/store";

const ListSurvey = dynamic(
  () => import("../../../components/content/subvit/survey/list-survey"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

export default function Survey(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListSurvey token={session.token} />
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
        getAllSurveyQuestionBanks(
          query.page,
          query.keyword,
          query.limit,
          session.user.user.data.token
        )
      );

      return {
        props: { session, title: "List Survey - Subvit" },
      };
    }
);
