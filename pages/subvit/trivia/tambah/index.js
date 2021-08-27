import Layout from "/components/templates/layout.component";
import StepOne from "/components/content/subvit/trivia/tambah/step-1";

export default function TambahBankSoalTesTriviaStep1() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Tambah Bank Soal Tes Trivia">
          <StepOne />
        </Layout>
      </div>
    </>
  );
}
