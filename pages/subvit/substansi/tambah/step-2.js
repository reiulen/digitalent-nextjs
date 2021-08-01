import Layout from "/components/templates/layout.component";
import StepTwo from "/components/content/subvit/substansi/tambah/step-2";

export default function TambahBankSoalTesSubstansiStep2() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Tambah Bank Soal Tes Subtansi">
          <StepTwo />
        </Layout>
      </div>
    </>
  );
}
