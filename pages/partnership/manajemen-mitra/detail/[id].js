import Layout from "../../../../components/templates/layout.component";
import DetailDataKerjasama from "../../../../components/content/partnership/manajemen-mitra/detailDataKerjasama";

export default function DetailDataKerjasamaPage() {
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
