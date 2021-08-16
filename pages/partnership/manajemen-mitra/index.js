import Layout from "../../../components/templates/layout.component";
import Table from "../../../components/content/partnership/manajemen-mitra/tableMitra";

import { getAllMitra } from "../../../redux/actions/partnership/mitra.actions";
import { wrapper } from "../../../redux/store";

export default function MitraPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Managemen Mitra">
          <Table />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      await store.dispatch(getAllMitra());
    }
);
