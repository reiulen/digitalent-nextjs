import Layout from "/components/templates/layout.component";
import TambahTipeSoal from "/components/content/subvit/substansi/tipe-soal/tambah";

export default function TambahTipeSoalTestSubstansi() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Tambah Tipe Soal Test Subtansi">
          <TambahTipeSoal />
        </Layout>
      </div>
    </>
  );
}
