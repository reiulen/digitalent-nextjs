import Layout from "../../../../components/templates/layout.component";
// import EditMitra from "../../../../components/content/partnership/manajemen-mitra/edit";

import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";

const EditMitra = dynamic(
  () => import("../../../../components/content/partnership/mitra/edit"),
  { loading: () => <LoadingPage />, ssr: false, suspense: true }
);

export default function EditMitraPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Edit Data Master Mitra Kerjasama - Paretnership">
          <EditMitra />
        </Layout>
      </div>
    </>
  );
}

// EditMitraPage.displayName = "EditMitraPage";
