import Layout from "../../../components/templates/layout.component";
import SubmitKerjasama from "../../../components/content/partnership/manajemen-kerjasama/submitKerjasama";

export default function Submit() {
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
