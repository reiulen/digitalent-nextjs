import Layout from "../../../components/templates/layout.component";
import EditArtikel from "../../../components/content/publikasi/artikel-peserta/edit";

import { getDetailArtikelPeserta } from "../../../redux/actions/publikasi/artikel-peserta.actions";
import { wrapper } from "../../../redux/store";

export default function EditArtikelPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Update Artikel Peserta">
          <EditArtikel />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(getDetailArtikelPeserta(params.id));
    }
);
