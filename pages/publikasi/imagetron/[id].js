import Layout from "../../../components/templates/layout.component";
import EditImagetron from "../../../components/content/publikasi/imagetron/edit";

import { getDetailImagetron } from "../../../redux/actions/publikasi/imagetron.actions";
import { wrapper } from "../../../redux/store";

export default function EditImagetronPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Update Imagetron">
          <EditImagetron />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(getDetailImagetron(params.id));
    }
);
