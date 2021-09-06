import Layout from "../../../../components/templates/layout.component";
// import EditMitra from "../../../../components/content/partnership/manajemen-mitra/edit";

import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";

const EditMitra = dynamic(
  () =>
    import("../../../../components/content/partnership/manajemen-mitra/edit"),
  { loading: () => <LoadingPage />, ssr: false }
);

export default function EditMitraPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Update Artikel">
          <EditMitra />
        </Layout>
      </div>
    </>
  );
}

// EditMitraPage.displayName = "EditMitraPage";
