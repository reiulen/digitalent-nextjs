import Layout from "../../../../components/templates/layout.component";
import Tambah from "../../../../components/content/partnership/user/input-profile-kerjasama/tambah";

export default function TambahPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Input Profile Kerjasama - Partnership">
          <Tambah />
        </Layout>
      </div>
    </>
  );
}
