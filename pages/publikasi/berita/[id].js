import dynamic from "next/dynamic";

import Layout from "../../../components/templates/layout.component";
// import EditBerita from "../../../components/content/publikasi/berita/edit"

import { getDetailBerita } from '../../../redux/actions/publikasi/berita.actions'
import { wrapper } from '../../../redux/store'

import LoadingPage from "../../../components/LoadingPage";

const EditBerita = dynamic(
    () => import("../../../components/content/publikasi/berita/edit"),
    { 
        // suspense: true,
        // loading: () => <LoadingSkeleton />, 
        loading: function loadingNow () {return <LoadingPage /> }, 
        ssr: false
    }
  );

export default function EditBeritaPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Ubah Berita - Publikasi'>
                    <EditBerita />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params }) => {
    await store.dispatch(getDetailBerita(params.id))
})