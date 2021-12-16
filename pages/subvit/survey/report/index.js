import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
// import ReportSurvey from "../../../../components/content/subvit/survey/report-survey";
import Layout from "../../../../components/templates/layout.component";

import { allReportSurveyQuestionBanks } from "../../../../redux/actions/subvit/survey-question.actions";
import { wrapper } from "../../../../redux/store";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";

const ReportSurvey = dynamic(
  () => import("../../../../components/content/subvit/survey/report-survey"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function ReportSurveyPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ReportSurvey
          token={session.token}
          tokenPermission={props.permission}
        />
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

      const permission = req.cookies.token_permission;

      await store.dispatch(
        allReportSurveyQuestionBanks(
          query.id,
          query.page,
          query.keyword,
          query.limit,
          query.pelatihan,
          query.status,
          query.card,
          session.user.user.data.token,
          permission
        )
      );
      return {
        props: { session, title: "Report Survey - Subvit", permission },
      };
    }
);
