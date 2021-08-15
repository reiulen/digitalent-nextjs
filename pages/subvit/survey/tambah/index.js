import TambahSurveyStep1 from "../../../../components/content/subvit/survey/tambah/step-1";
import Layout from "../../../../components/templates/layout.component";

export default function TambahSurveyStep1Page() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Tambah Survey">
          <TambahSurveyStep1 />
        </Layout>
      </div>
    </>
  );
}
