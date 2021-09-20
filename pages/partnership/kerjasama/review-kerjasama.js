import Layout from "../../../components/templates/layout.component";
// import ReviewKerjasama from "../../../components/content/partnership/kerjasama/reviewKerjasama";
import LoadingPage from "../../../components/LoadingPage";
import dynamic from "next/dynamic";

const ReviewKerjasama = dynamic(
  () =>
    import("../../../components/content/partnership/kerjasama/reviewKerjasama"),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function ReviewKerjasamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Review Kerjasama - Partnership">
          <ReviewKerjasama />
        </Layout>
      </div>
    </>
  );
}
