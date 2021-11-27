import DetailSurvey from "../../../components/content/subvit/survey/detail-survey";
import Layout from "../../../components/templates/layout.component";

import { getAllSurveyQuestionDetail } from "../../../redux/actions/subvit/survey-question-detail.action";
import { getDetailSurveyQuestionBanks } from "../../../redux/actions/subvit/survey-question.actions";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
import { getPermissionSubvit } from "../../../redux/actions/subvit/subtance.actions";

export default function DetailSurveyPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DetailSurvey token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, query, req }) => {
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
        getAllSurveyQuestionDetail(
          params.id,
          query.page,
          query.limit,
          query.keyword,
          session.user.user.data.token
        )
      );
      await store.dispatch(
        getDetailSurveyQuestionBanks(params.id, session.user.user.data.token)
      );

      await store.dispatch(getPermissionSubvit(session.user.user.data.token));

      return {
        props: { session, title: "Detail Survey - Subvit" },
      };
    }
);
