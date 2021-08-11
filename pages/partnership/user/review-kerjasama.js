import Layout from "../../../components/templates/layout.component";
import ReviewKerjasama from "../../../components/content/partnership/user/reviewKerjasama";

export default function ReviewKerjasamaPage() {
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
