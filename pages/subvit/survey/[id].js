import dynamic from "next/dynamic";
// import DetailSurvey from "../../../components/content/subvit/survey/detail-survey";
import Layout from "../../../components/templates/layout.component";

import { getAllSurveyQuestionDetail } from "../../../redux/actions/subvit/survey-question-detail.action";
import { getDetailSurveyQuestionBanks } from "../../../redux/actions/subvit/survey-question.actions";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
import { getPermissionSubvit } from "../../../redux/actions/subvit/subtance.actions";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const DetailSurvey = dynamic(
  () => import("../../../components/content/subvit/survey/detail-survey"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function DetailSurveyPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DetailSurvey
          token={session.token}
          tokenPermission={props.permission}
        />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, query, req }) => {
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

      const permission = req.cookies.token_permission;

      await store.dispatch(
        getAllSurveyQuestionDetail(
          params.id,
          query.page,
          query.limit,
          query.keyword,
          session.user.user.data.token,
          permission
        )
      );
      await store.dispatch(
        getDetailSurveyQuestionBanks(
          params.id,
          session.user.user.data.token,
          permission
        )
      );

      await store.dispatch(
        getPermissionSubvit(session.user.user.data.token, permission)
      );

      return {
        props: { session, title: "Detail Survey - Subvit", permission },
      };
    }
);
