import Layout from "../../../components/templates/layout.component";
import EditArtikel from "../../../components/content/publikasi/artikel/edit";

import { getDetailArtikel } from "../../../redux/actions/publikasi/artikel.actions";
import { wrapper } from "../../../redux/store";

export default function EditArtikelPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Update Artikel">
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
