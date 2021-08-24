import Layout from "../../../../components/templates/layout.component";
import EditDetailKerjasama from "../../../../components/content/partnership/manajemen-kerjasama/editDokumentKerjasama";

export default function editDokumenKerjasama() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <EditDetailKerjasama />
        </Layout>
      </div>
    </>
  );
}
