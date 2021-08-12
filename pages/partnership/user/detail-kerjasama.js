import Layout from "../../../components/templates/layout.component";
import DetailDokumen from "../../../components/content/partnership/user/detailDokumenKerjasama";

export default function DetailKerjasamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <DetailDokumen />
        </Layout>
      </div>
    </>
  );
}
