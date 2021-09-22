import Layout from "../../../components/templates/layout.component";
// import Tambah from "../../../components/content/partnership/manajemen-kerjasama/tambah";
import LoadingPage from "../../../components/LoadingPage";
import dynamic from "next/dynamic";

const Tambah = dynamic(
  () => import("../../../components/content/partnership/kerjasama/tambah"),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function TambahPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Tambah Kerjasama - Partnership">
          <Tambah />
        </Layout>
      </div>
    </>
  );
}

// TambahPage.displayName = "TambahPage";
