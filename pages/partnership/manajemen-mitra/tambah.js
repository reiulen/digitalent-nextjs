import Layout from "../../../components/templates/layout.component";
import Tambah from "../../../components/content/partnership/manajemen-mitra/tambahMitra";

import {
  getAllProvinsi,
  getAllKota,
} from "../../../redux/actions/utils/utils.actions";
import { wrapper } from "../../../redux/store";

export default function TambahPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Dashboard Publikasi">
          <Tambah />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(getAllProvinsi());
    }
);
