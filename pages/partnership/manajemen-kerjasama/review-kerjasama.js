import Layout from "../../../components/templates/layout.component";
import ReviewKerjasama from "../../../components/content/partnership/manajemen-kerjasama/reviewKerjasama";

export default function ReviewKerjasama() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <ReviewKerjasama />
        </Layout>
      </div>
    </>
  );
}
