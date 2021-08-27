import Layout from "../../../../components/templates/layout.component";
import DetailKerjasama from "../../../../components/content/partnership/manajemen-kerjasama/detailDokumenKerjasama";

export default function detailDokumenKerjasama() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <DetailKerjasama />
        </Layout>
      </div>
    </>
  );
}
