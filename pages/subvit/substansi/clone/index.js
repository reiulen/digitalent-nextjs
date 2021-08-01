import Layout from "/components/templates/layout.component";
import StepOne from "/components/content/subvit/substansi/clone/step-one";

export default function CloneSoalSubtansi() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Clone Bank Soal Tes Subtansi">
          <StepOne />
        </Layout>
      </div>
    </>
  );
}
