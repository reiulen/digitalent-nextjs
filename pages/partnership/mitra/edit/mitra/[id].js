import Layout from "../../../../../components/templates/layout.component";
// import DetailDataKerjasamaById from "../../../../../components/content/partnership/manajemen-mitra/editKerjasamaById";

import dynamic from "next/dynamic";
import LoadingPage from "../../../../../components/LoadingPage";

const DetailDataKerjasamaById = dynamic(
  () =>
    import(
      "../../../../../components/content/partnership/mitra/editKerjasamaById"
    ),
  { loading: () => <LoadingPage />, ssr: false }
);
export default function DetailDataKerjasamaPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Edit Data Master Mitra Kerjasama - Paretnership">
          <DetailDataKerjasamaById />
        </Layout>
      </div>
    </>
  );
}

// DetailDataKerjasamaPage.displayName = "DetailDataKerjasamaPage";
