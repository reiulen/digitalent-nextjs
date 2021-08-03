import Layout from "../../../components/templates/layout.component";
import DetailRevisi from "../../../components/content/partnership/manajemen-kerjasama/detailRevisiKerjasama";

export default function DetailRevisiKerjasama() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <DetailRevisi />
        </Layout>
      </div>
    </>
  );
}
