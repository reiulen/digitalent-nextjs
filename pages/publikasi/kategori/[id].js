import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import Layout from "../../../components/templates/layout.component";
// import EditKategori from "../../../components/content/publikasi/kategori/edit";

import { getDetailKategori } from "../../../redux/actions/publikasi/kategori.actions";
import { wrapper } from "../../../redux/store";

import LoadingPage from "../../../components/LoadingPage";

const EditKategori = dynamic(
  () => import("../../../components/content/publikasi/kategori/edit"),
  {
    // suspense: true,
    // loading: () => <LoadingSkeleton />,
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

export default function EditKategoriPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Ubah Kategori">
                    <EditKategori />
                </Layout> */}
        <EditKategori token={session.token} />
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
            destination: "/login/admin",
            permanent: false,
          },
        };
      }
      await store.dispatch(
        getDetailKategori(params.id, session.user.user.data.token)
      );
      return {
        props: { session, title: "Ubah Kategori - Publikasi" },
      };
    }
);

// export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
//     await store.dispatch(getDetailKategori(params.id));
// });
