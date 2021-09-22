import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import Layout from "../../../components/templates/layout.component";
// import Artikel from "../../../components/content/publikasi/artikel/artikel";
// import ContentLoader from "react-content-loader"

import { getAllArtikel } from '../../../redux/actions/publikasi/artikel.actions'
import { wrapper } from '../../../redux/store'

import LoadingPage from "../../../components/LoadingPage";
import LoadingSkeleton from "../../../components/LoadingSkeleton"

const Artikel = dynamic(
    () => import("../../../components/content/publikasi/artikel/artikel"),
    {
        // suspense: true,
        // loading: () => <LoadingSkeleton />, 
        loading: function loadingNow() { return <LoadingSkeleton /> },
        ssr: false
    }
);

export default function ArtikelPage(props) {
    // console.log(props, "AAAAAAAAAAAAAAAAA")
    // console.log(data, 'INI DATA')
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Artikel - Publikasi'>
                    <Artikel />
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
    await store.dispatch(getAllArtikel(query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate, session.user.user.data.token))
})

// export const getStaticProps = wrapper.getStaticProps(
//     store => async ({ query }) => {
//             await store.dispatch(getAllArtikel(
//                 // query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate
//                 1,'',5,1,null,null
//                 ))
//             console.log('aaaaaaa')
//         }
// )

// export const getStaticProps = async (ctx) =>{
//     const resp = await fetch('http://dts-publikasi-dev.majapahit.id/api/artikel')
//     const {data} = await resp.json()
//     return { 
//         props : data
//     }
// }