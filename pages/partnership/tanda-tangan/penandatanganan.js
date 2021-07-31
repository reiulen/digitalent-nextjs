import Layout from "../../../components/templates/layout.component";
import Penandatanganan from "../../../components/content/partnership/tanda-tangan/Penandatanganan";

export default function KerjaSamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <Penandatanganan />
        </Layout>
      </div>
    </>
  );
}
