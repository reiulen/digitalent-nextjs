import Layout from "/components/templates/layout.component";
import StepThree from "/components/content/subvit/trivia/tambah/step-3";

export default function TambahBankSoalTriviaStep3() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Tambah Bank Soal Trivia">
          <StepThree />
        </Layout>
      </div>
    </>
  );
}
