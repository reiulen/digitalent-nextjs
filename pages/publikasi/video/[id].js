import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

// import Layout from "../../../components/templates/layout.component";
// import EditVideo from "../../../components/content/publikasi/vidio/edit";

import { getDetailVideo } from '../../../redux/actions/publikasi/video.actions'
import { getAllKategori } from '../../../redux/actions/publikasi/kategori.actions'
import { wrapper } from '../../../redux/store'

import LoadingPage from "../../../components/LoadingPage";

const EditVideo = dynamic(
    () => import("../../../components/content/publikasi/vidio/edit"),
    { 
        // suspense: true,
        // loading: () => <LoadingSkeleton />, 
        loading: function loadingNow () {return <LoadingPage /> }, 
        ssr: false
    }
);

export default function EditArtikelPage(props) {
    const session = props.session.user.user.data;
    return (
        <>
            <div className="d-flex flex-column flex-root">
                {/* <Layout title='Ubah Video - Publikasi'>
                    <EditVideo />
                </Layout> */}
                <EditVideo token={session.token}/>
            </div>
        </>
    )
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
        await store.dispatch(getDetailVideo(params.id,  session.user.user.data.token));
        await store.dispatch(getAllKategori(session.user.user.data.token))
  
        return {
          props: { session, title: "Edit Video - Publikasi" },
      };
      }
  );

// export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params }) => {
//     await store.dispatch(getDetailVideo(params.id))
// })