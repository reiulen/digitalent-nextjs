import Layout from "../../../components/templates/layout.component";
// import SubmitKerjasama from "../../../components/content/partnership/manajemen-kerjasama/submitKerjasama";

import dynamic from "next/dynamic";
import LoadingPage from "../../../components/LoadingPage";

const SubmitKerjasama = dynamic(
  () =>
    import("../../../components/content/partnership/kerjasama/submitKerjasama"),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function Submit() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Submit Data Kerjasama - Partnership">
          <SubmitKerjasama />
        </Layout>
      </div>
    </>
  );
}

// Submit.displayName = "Submit";
