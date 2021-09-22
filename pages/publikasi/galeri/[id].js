import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import Layout from "../../../components/templates/layout.component";
// import EditGaleri from "../../../components/content/publikasi/galeri/edit";

import { getDetailGaleri } from "../../../redux/actions/publikasi/galeri.actions";
import { wrapper } from "../../../redux/store";

import LoadingPage from "../../../components/LoadingPage";

const EditGaleri = dynamic(
  () => import("../../../components/content/publikasi/galeri/edit"),
  {
    // suspense: true,
    // loading: () => <LoadingSkeleton />, 
    loading: function loadingNow() { return <LoadingPage /> },
    ssr: false
  }
);

export default function EditGaleriPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Ubah Galeri - Publikasi">
          <EditGaleri />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
      await store.dispatch(getDetailGaleri(params.id, session.user.user.data.token));
    }
);