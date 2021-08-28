import ReportTrivia from "../../../../components/content/subvit/trivia/report-trivia";
import Layout from "../../../../components/templates/layout.component";

import { allReportTriviaQuestionBanks } from "../../../../redux/actions/subvit/trivia-question.actions";
import { wrapper } from "../../../../redux/store";

export default function ReportTriviaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Report Trivia">
          <ReportTrivia />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      await store.dispatch(
        allReportTriviaQuestionBanks(
          query.id,
          query.page,
          query.keyword,
          query.limit,
          query.card
        )
      );
    }
);
