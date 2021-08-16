import Layout from "/components/templates/layout.component";
import StepTwo from "/components/content/subvit/trivia/tambah/step-2-entry";

export default function TambahBankSoalTesTriviaStep2() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Tambah Bank Soal Tes Trivia">
          <StepTwo />
        </Layout>
      </div>
    </>
  );
}
