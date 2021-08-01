import ReportTrivia from "../../../../components/content/subvit/trivia/report-trivia";
import Layout from "../../../../components/templates/layout.component";

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
