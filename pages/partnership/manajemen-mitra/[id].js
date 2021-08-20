import Layout from "../../../components/templates/layout.component";
import EditMitra from "../../../components/content/partnership/manajemen-mitra/edit";

import { getDetailMitra } from "../../../redux/actions/partnership/mitra.actions";
import {
  getAllProvinsi,
  getAllKota,
} from "../../../redux/actions/utils/utils.actions";
import { wrapper } from "../../../redux/store";

export default function EditMitraPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Update Artikel">
          <EditMitra />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(getDetailMitra(params.id));
      await store.dispatch(getAllProvinsi());
    }
);
