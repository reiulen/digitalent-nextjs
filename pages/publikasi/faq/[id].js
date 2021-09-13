import dynamic from "next/dynamic";

import Layout from "../../../components/templates/layout.component";
// import EditFaq from "../../../components/content/publikasi/faq/edit";

import { getDetailFaq } from "../../../redux/actions/publikasi/faq.actions";
import { getAllKategoriInput } from '../../../redux/actions/publikasi/kategori.actions'
import { wrapper } from "../../../redux/store";

import LoadingPage from "../../../components/LoadingPage";

const EditFaq = dynamic(
    () => import("../../../components/content/publikasi/faq/edit"),
    { 
        // suspense: true,
        // loading: () => <LoadingSkeleton />, 
        loading: function loadingNow () {return <LoadingPage /> }, 
        ssr: false
    }
);

export default function EditFaqPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title="Ubah FAQ - Publikasi">
                    <EditFaq />
                </Layout>
            </div>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
    await store.dispatch(getDetailFaq(params.id));
    await store.dispatch(getAllKategoriInput("Faq"));
});
