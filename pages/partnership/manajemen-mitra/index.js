import Layout from "../../../components/templates/layout.component";
import Table from "../../../components/content/partnership/manajemen-mitra/tableMitra";

export default function MitraPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Managemen Mitra">
          <Table />
        </Layout>
      </div>
    </>
  );
}
