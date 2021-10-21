import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

// import Layout from "../../../components/templates/layout.component";
// import EditArtikel from "../../../components/content/publikasi/artikel-peserta/edit";

import { getDetailArtikelPeserta } from "../../../redux/actions/publikasi/artikel-peserta.actions";
import { getAllKategori } from "../../../redux/actions/publikasi/kategori.actions";
import { wrapper } from "../../../redux/store";

import LoadingPage from "../../../components/LoadingPage";

const EditArtikel = dynamic(
  () => import("../../../components/content/publikasi/artikel-peserta/edit"),
  {
    // suspense: true,
    // loading: () => <LoadingSkeleton />,
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

export default function EditArtikelPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title="Ubah Artikel Peserta - Publikasi">
          <EditArtikel />
        </Layout> */}
        <EditArtikel token={session.token} />
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
            destination: "http://dts-dev.majapahit.id/login/admin",
            permanent: false,
          },
        };
      }
      await store.dispatch(
        getDetailArtikelPeserta(params.id, session.user.user.data.token)
      );
      await store.dispatch(getAllKategori(session.user.user.data.token));

      return {
        props: { session, title: "Ubah Artikel Peserta - Publikasi" },
      };
    }
);

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ params, req }) => {
//       const session = await getSession({ req });
//       if (!session) {
//         return {
//           redirect: {
//             destination:"/login/admin",
//             permanent: false,
//           },
//         };
//       }
//       await store.dispatch(getDetailArtikelPeserta(params.id, session.user.user.data.token));
//     }
// );
