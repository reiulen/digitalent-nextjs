import dynamic from "next/dynamic";

import Layout from "../../../components/templates/layout.component";
// import ArtikelPeserta from "../../../components/content/publikasi/artikel-peserta/artikel-peserta";

import { getAllArtikelPeserta } from '../../../redux/actions/publikasi/artikel-peserta.actions'
import { wrapper } from '../../../redux/store'

import LoadingPage from "../../../components/LoadingPage";
import LoadingSkeleton from "../../../components/LoadingSkeleton"

const ArtikelPeserta = dynamic(
    () => import("../../../components/content/publikasi/artikel-peserta/artikel-peserta"),
    { loading: () => <LoadingSkeleton />, ssr: false}
);

export default function ArtikelPesertaPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Artikel Peserta'>
                    <ArtikelPeserta />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
    await store.dispatch(getAllArtikelPeserta(query.role, query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate))
})