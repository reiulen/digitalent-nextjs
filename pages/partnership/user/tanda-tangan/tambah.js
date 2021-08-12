import Layout from "../../../../components/templates/layout.component";
import Tambah from "../../../../components/content/partnership/user/tanda-tangan/tambah";

export default function TambahPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <Tambah />
        </Layout>
      </div>
    </>
  );
}
