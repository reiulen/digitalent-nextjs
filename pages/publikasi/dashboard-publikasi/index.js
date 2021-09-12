import dynamic from "next/dynamic";

import Layout from "../../../components/templates/layout.component";
// import Berita from "../../../components/content/publikasi/berita/berita";

// import { getAllBerita } from "../../../redux/actions/publikasi/berita.actions"
import { wrapper } from "../../../redux/store"

import LoadingPage from "../../../components/LoadingPage";
import LoadingSkeleton from "../../../components/LoadingSkeleton"

const DashboardPublikasi = dynamic(
    () => import("../../../components/content/publikasi/dashboard-publikasi/dashboard-publikasi"),
    { 
        // suspense: true,
        // loading: () => <LoadingSkeleton />, 
        loading: function loadingNow () {return <LoadingSkeleton /> }, 
        ssr: false
    }
);

export default function DashboardPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Dashboard Publikasi'>
                    <DashboardPublikasi />
                </Layout>
            </div>
        </>
    )
}

// export const getServerSideProps = wrapper.getServerSideProps (store => async ({ query }) => {
//     await store.dispatch (getAllBerita (query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate))
// })