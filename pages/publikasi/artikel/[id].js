import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

// import Layout from "../../../components/templates/layout.component";
// import EditArtikel from "../../../components/content/publikasi/artikel/edit";

import { getDetailArtikel } from "../../../redux/actions/publikasi/artikel.actions";
import { getAllKategori } from "../../../redux/actions/publikasi/kategori.actions";
import { wrapper } from "../../../redux/store";

import LoadingPage from "../../../components/LoadingPage";
import { getSettingPublikasi } from "../../../redux/actions/publikasi/setting.actions";

const EditArtikel = dynamic(
  () => import("../../../components/content/publikasi/artikel/edit"),
  {
    // suspense: true,
    // loading: () => <LoadingSkeleton />,
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

// export default function EditArtikelPage() {
//   return (
//     <>
//       <div className="d-flex flex-column flex-root">
//         <Layout title="Ubah Artikel - Publikasi">
//           <EditArtikel />
//         </Layout>
//       </div>
//     </>
//   );
// }

export default function EditArtikelPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditArtikel token={session.token} idUser={session.user.id} />
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
        getDetailArtikel(params.id, session.user.user.data.token)
      );
      await store.dispatch(getAllKategori(session.user.user.data.token));
      await store.dispatch(getSettingPublikasi(session.user.user.data.token));

      return {
        props: { session, title: "Ubah Artikel - Publikasi" },
      };
    }
);
