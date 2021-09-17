import Layout from "../../../components/templates/layout.component";
import ReviewDokKerjasama from "../../../components/content/partnership/user/reviewDokKerjasama";

export default function ReviewDokKerjasamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <ReviewDokKerjasama />
        </Layout>
      </div>
    </>
  );
}
