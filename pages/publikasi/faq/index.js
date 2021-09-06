import dynamic from "next/dynamic";

import Layout from "../../../components/templates/layout.component";
// import Faq from "../../../components/content/publikasi/faq/faq";

import { getAllFaq, getAllFaqPagination } from '../../../redux/actions/publikasi/faq.actions'
import { wrapper } from '../../../redux/store'

import LoadingPage from "../../../components/LoadingPage";

const FAQ = dynamic(
    () => import("../../../components/content/publikasi/faq/faq"),
    { loading: () => <LoadingPage />, ssr: false }
);

export default function FaqPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='FAQ'>
                    <FAQ />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
    // await store.dispatch(getAllFaq())
    // await store.dispatch(getAllFaq(query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate))
    await store.dispatch(getAllFaqPagination(query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate))
})

