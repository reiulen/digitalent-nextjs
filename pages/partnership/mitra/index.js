import Layout from "../../../components/templates/layout.component";
// import Table from "../../../components/content/partnership/mitra/tableMitra";

import dynamic from "next/dynamic";
// import LoadingPage from "../../../components/LoadingPage";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
const Table = dynamic(
  () => import("../../../components/content/partnership/mitra/tableMitra"),
  { loading: () => <LoadingSkeleton />, ssr: false, suspense: true }
);
export default function MitraPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Master Mitra - Partnership">
          <Table />
        </Layout>
      </div>
    </>
  );
}

// MitraPage.displayName = "MitraPage";
