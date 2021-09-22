import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import Layout from "../../../components/templates/layout.component";
// import Berita from "../../../components/content/publikasi/berita/berita";

import { getAllBerita } from "../../../redux/actions/publikasi/berita.actions"
import { wrapper } from "../../../redux/store"

import LoadingPage from "../../../components/LoadingPage";
import LoadingSkeleton from "../../../components/LoadingSkeleton"

const Berita = dynamic(
    () => import("../../../components/content/publikasi/berita/berita"),
    {
        // suspense: true,
        // loading: () => <LoadingSkeleton />, 
        loading: function loadingNow() { return <LoadingSkeleton /> },
        ssr: false
    }
);

export default function BeritaPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Berita - Publikasi'>
                    <Berita />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query, req }) => {
    const session = await getSession({ req });
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    await store.dispatch(getAllBerita(query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate, session.user.user.data.token))
})