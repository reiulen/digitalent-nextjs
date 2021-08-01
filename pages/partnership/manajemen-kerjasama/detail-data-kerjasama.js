import Layout from "../../../components/templates/layout.component";
import DetailDataKerjasama from "../../../components/content/partnership/manajemen-kerjasama/detailDataKerjasama";

export default function KerjaSamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <DetailDataKerjasama />
        </Layout>
      </div>
    </>
  );
}
