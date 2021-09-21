import { getSession } from "next-auth/client";
import ReportSurvey from "../../../../components/content/subvit/survey/report-survey";
import Layout from "../../../../components/templates/layout.component";

import { allReportSurveyQuestionBanks } from "../../../../redux/actions/subvit/survey-question.actions";
import { wrapper } from "../../../../redux/store";

export default function ReportSurveyPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ReportSurvey token={session.token} />
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
            destination: "/",
            permanent: false,
          },
        };
      }
      await store.dispatch(
        allReportSurveyQuestionBanks(
          query.id,
          query.page,
          query.keyword,
          query.limit,
          query.pelatihan,
          query.status,
          query.card,
          session.user.user.data.token
        )
      );
      return {
        props: { session, title: "Report Survey - Subvit" },
      };
    }
);
