import Layout from "../../../../components/templates/layout.component";
import ReviewDokumenKerjasama from "../../../../components/content/partnership/user/reviewDokumenKerjasama";

export default function RevisiListPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Review Kerjasama - Partnership">
          <ReviewDokumenKerjasama />
        </Layout>
      </div>
    </>
  );
}
