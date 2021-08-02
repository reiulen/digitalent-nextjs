import Layout from "/components/templates/layout.component";
import EditTipeSoal from "/components/content/subvit/substansi/tipe-soal/edit";

export default function EditTipeSoalTestSubstansi() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Edit Tipe Soal Test Subtansi">
          <EditTipeSoal />
        </Layout>
      </div>
    </>
  );
}
