import Layout from "../../../components/templates/layout.component";
import EditGaleri from "../../../components/content/publikasi/galeri/edit";

import { getDetailGaleri } from "../../../redux/actions/publikasi/galeri.actions";
import { wrapper } from "../../../redux/store";

export default function EditArtikelPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Update Galeri">
          <EditGaleri />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(getDetailGaleri(params.id));
    }
);