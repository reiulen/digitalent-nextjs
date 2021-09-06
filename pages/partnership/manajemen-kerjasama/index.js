import dynamic from "next/dynamic";
import LoadingPage from "../../../components/LoadingPage";
import Layout from "../../../components/templates/layout.component";
// import Table from "../../../components/content/partnership/manajemen-kerjasama/tableKerjasama";

const Table = dynamic(
  () =>
    import(
      "../../../components/content/partnership/manajemen-kerjasama/tableKerjasama"
    ),
  { loading: () => <LoadingPage />, ssr: false }
);

export default function KerjaSamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Kerjasama">
          <Table />
        </Layout>
      </div>
    </>
  );
}

KerjaSamaPage.displayName = "KerjaSamaPage";
