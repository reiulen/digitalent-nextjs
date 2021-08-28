import ReportSurvey from "../../../../components/content/subvit/survey/report-survey";
import Layout from "../../../../components/templates/layout.component";

import { allReportSurveyQuestionBanks } from "../../../../redux/actions/subvit/survey-question.actions";
import { wrapper } from "../../../../redux/store";

export default function ReportSurveyPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Report Survey">
          <ReportSurvey />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      await store.dispatch(
        allReportSurveyQuestionBanks(
          query.id,
          query.page,
          query.keyword,
          query.limit,
          query.pelatihan,
          query.status,
          query.card
        )
      );
    }
);
