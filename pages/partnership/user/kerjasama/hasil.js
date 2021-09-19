import Layout from "../../../../components/templates/layout.component";
import Hasil from "../../../../components/content/partnership/user/hasil";

export default function PembahasanPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Hasil kerjasama - Partnership">
          <Hasil />
        </Layout>
      </div>
    </>
  );
}
