import Layout from "../../../components/templates/layout.component";
import SubmitKerjasama from "../../../components/content/partnership/manajemen-kerjasama/revisiKerjasama";

export default function KerjaSamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <SubmitKerjasama />
        </Layout>
      </div>
    </>
  );
}
