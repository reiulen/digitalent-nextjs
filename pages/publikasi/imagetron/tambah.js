import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";
// import Tambah from "../../../components/content/publikasi/imagetron/tambah";

import LoadingPage from "../../../components/LoadingPage";
import { getSession } from "next-auth/client";
import { getAllKategori } from "../../../redux/actions/publikasi/kategori.actions";
import { wrapper } from "../../../redux/store";

const Tambah = dynamic(
  () => import("../../../components/content/publikasi/imagetron/tambah"),
  {
    // suspense: true,
    // loading: () => <LoadingSkeleton />,
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

export default function TambahPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title='Tambah Imagetron - Publikasi'> */}
        <Tambah />
        {/* </Layout> */}
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req }) => {
      const session = await getSession({ req });
      // console.log (`from artikel create ${session}`)

      if (!session) {
        return {
          redirect: {
            destination: "http://dts-dev.majapahit.id/",
            permanent: false,
          },
        };
      }

      await store.dispatch(getAllKategori(session.user.user.data.token));

      return {
        props: { session, title: "Tambah Imagetron - Publikasi" },
      };
    }
);
