import DetailSubstansi from "../../../components/content/subvit/substansi/detail-substansi";
import Layout from "../../../components/templates/layout.component";

export default function DetailSubstansiPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Detail Substansi">
          <DetailSubstansi />
        </Layout>
      </div>
    </>
  );
}
