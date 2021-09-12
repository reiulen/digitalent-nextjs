import Layout from "../../../components/templates/layout.component";
// import Table from "../../../components/content/partnership/manajemen-mitra/tableMitra";

import dynamic from "next/dynamic";
import LoadingPage from "../../../components/LoadingPage";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
const Table = dynamic(
  () =>
    import(
      "../../../components/content/partnership/manajemen-mitra/tableMitra"
    ),
  { loading: () => <LoadingSkeleton />, ssr: false }
);
export default function MitraPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Managemen Mitra">
          <Table />
        </Layout>
      </div>
    </>
  );
}

// MitraPage.displayName = "MitraPage";
