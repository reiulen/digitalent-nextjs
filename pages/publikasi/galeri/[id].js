import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import Layout from "../../../components/templates/layout.component";
// import EditGaleri from "../../../components/content/publikasi/galeri/edit";

import { getDetailGaleri } from "../../../redux/actions/publikasi/galeri.actions";
import { getAllKategori } from '../../../redux/actions/publikasi/kategori.actions'
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

export default function EditGaleriPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditGaleri token={session.token} />
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
      await store.dispatch(getAllKategori(session.user.user.data.token))

      return {
        props: { session, title: "Ubah Galeri" },
      };
    });

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ params }) => {
//       await store.dispatch(getDetailGaleri(params.id));
//     }
// );

