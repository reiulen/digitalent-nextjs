import Layout from "../../../components/templates/layout.component";
import MasterKategoriKerjasama from "../../../components/content/partnership/master-kategori-kerjasama/masterKategoriKerjasama";

export default function KerjaSamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <MasterKategoriKerjasama />
        </Layout>
      </div>
    </>
  );
}
