import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import Layout from "../../../components/templates/layout.component";
// import ArtikelPeserta from "../../../components/content/publikasi/artikel-peserta/artikel-peserta";

import { getAllArtikelPeserta } from '../../../redux/actions/publikasi/artikel-peserta.actions'
import { wrapper } from '../../../redux/store'

import LoadingPage from "../../../components/LoadingPage";
import LoadingSkeleton from "../../../components/LoadingSkeleton"

const ArtikelPeserta = dynamic(
    () => import("../../../components/content/publikasi/artikel-peserta/artikel-peserta"),
    {
        // suspense: true,
        // loading: () => <LoadingSkeleton />, 
        loading: function loadingNow() { return <LoadingSkeleton /> },
        ssr: false
    }
);

export default function ArtikelPesertaPage(props) {
    const session = props.session.user.user.data;
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <ArtikelPeserta token={session.token}/>
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
    
    await store.dispatch(getAllArtikelPeserta(query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate, session.user.user.data.token))
    // await store.dispatch(getAllKategori(session.user.user.data.token))
    return {
        props: { session, title: "Artikel - Publikasi" },
    };
})

// export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query, req }) => {
//     const session = await getSession({ req });
//     if (!session) {
//         return {
//             redirect: {
//                 destination: "/",
//                 permanent: false,
//             },
//         };
//     }
//     await store.dispatch(getAllArtikelPeserta(query.role, query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate, session.user.user.data.token))
// })