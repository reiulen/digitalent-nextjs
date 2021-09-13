import Layout from "../../../components/templates/layout.component";
import SubmitKerjasama from "../../../components/content/partnership/kerjasama/revisiKerjasama";

export default function RevisiSubmit() {
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
