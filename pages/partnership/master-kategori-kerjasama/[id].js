import Layout from "../../../components/templates/layout.component";
// import Edit from "../../../components/content/partnership/master-kategori-kerjasama/edit";

import dynamic from "next/dynamic";
import LoadingPage from "../../../components/LoadingPage";

const Edit = dynamic(
  () =>
    import(
      "../../../components/content/partnership/manajemen-kerjasama/tableKerjasama"
    ),
  { loading: () => <LoadingPage />, ssr: false }
);

export default function TambahPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Partnership">
          <Edit />
        </Layout>
      </div>
    </>
  );
}

TambahPage.displayName = "TambahPage";
