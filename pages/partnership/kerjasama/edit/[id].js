import Layout from "../../../../components/templates/layout.component";
// import EditDetailKerjasama from "../../../../components/content/partnership/manajemen-kerjasama/editDokumentKerjasama";
import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/LoadingPage";

const EditDetailKerjasama = dynamic(
  () =>
    import(
      "../../../../components/content/partnership/kerjasama/editDokumentKerjasama"
    ),
  { loading: () => <LoadingPage />, ssr: false }
);

export default function editDokumenKerjasama() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Edit Data Kerjasama - Partnership">
          <EditDetailKerjasama />
        </Layout>
      </div>
    </>
  );
}

// editDokumenKerjasama.displayName = "editDokumenKerjasama";
