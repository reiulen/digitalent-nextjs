import dynamic from "next/dynamic";

import Layout from "../../../components/templates/layout.component";
// import Tambah from "../../../components/content/publikasi/faq/tambah";

import { getAllKategoriInput } from '../../../redux/actions/publikasi/kategori.actions'
import { wrapper } from '../../../redux/store'

import LoadingPage from "../../../components/LoadingPage";

const Tambah = dynamic(
    () => import("../../../components/content/publikasi/faq/tambah"),
    { 
        // suspense: true,
        // loading: () => <LoadingSkeleton />, 
        loading: function loadingNow () {return <LoadingPage /> }, 
        ssr: false
    }
);

export default function TambahPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Tambah FAQ - Publikasi'>
                    <Tambah />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    await store.dispatch(getAllKategoriInput("Faq"));
});