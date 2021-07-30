import Layout from "../../../components/templates/layout.component";
import Table from "../../../components/content/partnership/manajemen-kerjasama/tableKerjasama";

export default function KerjaSamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <Table />
        </Layout>
      </div>
    </>
  );
}
