import Layout from "../../../components/templates/layout.component";
import ReviewDokumenKerjasama from "../../../components/content/partnership/user/reviewDokumenKerjasama";

export default function PembahasanPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <ReviewDokumenKerjasama />
        </Layout>
      </div>
    </>
  );
}
