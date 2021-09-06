import Layout from "../../../../components/templates/layout.component";
// import DetailKerjasama from "../../../../components/content/partnership/manajemen-kerjasama/detailDokumenKerjasama";
import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";

const DetailKerjasama = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/manajemen-kerjasama/detailDokumenKerjasama"
    ),
  { loading: () => <LoadingPage />, ssr: false }
);

export default function detailDokumenKerjasama() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <DetailKerjasama />
        </Layout>
      </div>
    </>
  );
}

// detailDokumenKerjasama.displayName = "detailDokumenKerjasama";
