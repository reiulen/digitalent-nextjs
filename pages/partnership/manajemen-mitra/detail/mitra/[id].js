import Layout from "../../../../../components/templates/layout.component";
import DetailDataKerjasamaById from "../../../../../components/content/partnership/manajemen-mitra/detailKerjasamaById";

export default function DetailDataKerjasamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <DetailDataKerjasamaById />
        </Layout>
      </div>
    </>
  );
}
