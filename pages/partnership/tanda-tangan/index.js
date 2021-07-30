import Layout from "../../../components/templates/layout.component";
import TandaTangan from "../../../components/content/partnership/tanda-tangan/tableTandaTangan";

export default function KerjaSamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <TandaTangan />
        </Layout>
      </div>
    </>
  );
}
