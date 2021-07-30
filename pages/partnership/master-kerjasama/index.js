import Layout from "../../../components/templates/layout.component";
import MasterTable from "../../../components/content/partnership/master-kerjasama/tableKerjasama";

export default function KerjaSamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <MasterTable />
        </Layout>
      </div>
    </>
  );
}
