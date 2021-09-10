import dynamic from "next/dynamic";

import Layout from "../../../components/templates/layout.component";
// import EditImagetron from "../../../components/content/publikasi/imagetron/edit";

import { getDetailImagetron } from "../../../redux/actions/publikasi/imagetron.actions";
import { wrapper } from "../../../redux/store";

import LoadingPage from "../../../components/LoadingPage";

const EditImagetron = dynamic(
  () => import("../../../components/content/publikasi/imagetron/edit"),
  { 
      // suspense: true,
      // loading: () => <LoadingSkeleton />, 
      loading: function loadingNow () {return <LoadingPage /> }, 
      ssr: false
  }
);

export default function EditImagetronPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Ubah Imagetron">
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
