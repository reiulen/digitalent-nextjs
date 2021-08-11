import Layout from "../../../components/templates/layout.component";
import Selesai from "../../../components/content/partnership/user/selesai";

export default function SelesaiPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <Selesai />
        </Layout>
      </div>
    </>
  );
}
