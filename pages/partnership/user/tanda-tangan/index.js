import Layout from "../../../../components/templates/layout.component";
import Table from "../../../../components/content/partnership/user/tanda-tangan/table";

export default function TandaTanganPage() {
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
