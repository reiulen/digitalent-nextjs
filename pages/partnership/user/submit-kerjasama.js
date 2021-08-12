import Layout from "../../../components/templates/layout.component";
import SubmitKerjasama from "../../../components/content/partnership/user/submitKerjasama";

export default function DetailKerjasamaPage() {
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
