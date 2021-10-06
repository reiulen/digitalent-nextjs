import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { getAllKategori } from "/redux/actions/publikasi/kategori.actions";
import { wrapper } from "/redux/store";

import LoadingPage from "/components/LoadingPage";

const Tambah = dynamic(
  () =>
    import(
      "/components/content/site-management/master-data/master-satuan-kerja-penyelenggara/tambah"
    ),
  {
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

export default function TambahPage(props) {
  const session = props.session.user.user.data;
  // console.log (session)
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* <Layout title='Tambah Artikel - Publikasi'>
                    <Tambah />
                </Layout> */}
        <Tambah token={session.token} />
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
            destination: "http://dts-dev.majapahit.id/",
            permanent: false,
          },
        };
      }

      await store.dispatch(getAllKategori(session.user.user.data.token));

      return {
        props: { session, title: "Tambah Artikel - Publikasi" },
      };
    }
);
