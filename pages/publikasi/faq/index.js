import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import Layout from "../../../components/templates/layout.component";
// import Faq from "../../../components/content/publikasi/faq/faq";

import { getAllFaq, getAllFaqPagination } from '../../../redux/actions/publikasi/faq.actions'
import { wrapper } from '../../../redux/store'

// import LoadingPage from "../../../components/LoadingPage";
import LoadingSkeleton from "../../../components/LoadingSkeleton"

const FAQ = dynamic(
    () => import("../../../components/content/publikasi/faq/faq"),
    {
        // suspense: true,
        // loading: () => <LoadingSkeleton />, 
        loading: function loadingNow() { return <LoadingSkeleton /> },
        ssr: false
    }
);

export default function FaqPage(props) {
    const session = props.session.user.user.data;
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <FAQ token={session.token}/>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query, req }) => {
    // await store.dispatch(getAllArtikel(query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate))
    const session = await getSession({ req });
    if (!session) {
        return {
            redirect: {
            destination: "/",
            permanent: false,
            },
        };
    }
    
    await store.dispatch(getAllFaqPagination(query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate, session.user.user.data.token))
    // await store.dispatch(getAllKategori(session.user.user.data.token))
    return {
        props: { session, title: "FAQ - Publikasi" },
    };
})

// export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
//     // await store.dispatch(getAllFaq())
//     // await store.dispatch(getAllFaq(query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate))
//     await store.dispatch(getAllFaqPagination(query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate))
// })

