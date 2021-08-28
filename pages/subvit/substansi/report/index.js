import Layout from "/components/templates/layout.component";
import Report from "/components/content/subvit/substansi/report";
import { allReportSubtanceQuestionBanks } from "../../../../redux/actions/subvit/subtance.actions";
import { wrapper } from "../../../../redux/store";

export default function ReportPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Report Bank Soal Tes Subtansi">
          <Report />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      await store.dispatch(
        allReportSubtanceQuestionBanks(
          query.id,
          query.page,
          query.keyword,
          query.limit,
          query.pelatihan,
          query.status,
          query.nilai,
          query.card
        )
      );
    }
);
