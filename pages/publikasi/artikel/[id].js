import dynamic from "next/dynamic";

import Layout from "../../../components/templates/layout.component";
// import EditArtikel from "../../../components/content/publikasi/artikel/edit";

import { getDetailArtikel } from "../../../redux/actions/publikasi/artikel.actions";
import { wrapper } from "../../../redux/store";

import LoadingPage from "../../../components/LoadingPage";

const EditArtikel = dynamic(
  () => import("../../../components/content/publikasi/artikel/edit"),
  { 
      // suspense: true,
      // loading: () => <LoadingSkeleton />, 
      loading: function loadingNow () {return <LoadingPage /> }, 
      ssr: false
  }
);

export default function EditArtikelPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Ubah Artikel">
          <EditArtikel />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(getDetailArtikel(params.id));
    }
);
