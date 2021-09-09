import dynamic from "next/dynamic";

import Layout from "../../../components/templates/layout.component";
// import Galeri from "../../../components/content/publikasi/galeri/galeri";

import { getAllGaleri } from '../../../redux/actions/publikasi/galeri.actions'
import { wrapper } from '../../../redux/store'

import LoadingPage from "../../../components/LoadingPage";
import LoadingSkeleton from "../../../components/LoadingSkeleton"

const Galeri = dynamic(
    () => import("../../../components/content/publikasi/galeri/galeri"),
    { 
        // suspense: true,
        // loading: () => <LoadingSkeleton />, 
        loading: function loadingNow () {return <LoadingSkeleton /> }, 
        ssr: false
    }
);

export default function GaleriPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Galeri'>
                    <Galeri />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
    await store.dispatch(getAllGaleri(query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate))
})