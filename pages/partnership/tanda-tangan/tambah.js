import Layout from "../../../components/templates/layout.component";
// import Tambah from "../../../components/content/partnership/tanda-tangan/tambah";

import dynamic from "next/dynamic";
import LoadingPage from "../../../components/LoadingPage";

const Tambah = dynamic(
  () => import("../../../components/content/partnership/tanda-tangan/tambah"),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);
export default function TambahPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Tambah Tanda Tangan Digital - Partnership">
          <Tambah />
        </Layout>
      </div>
    </>
  );
}

TambahPage.displayName = "TambahPage";
