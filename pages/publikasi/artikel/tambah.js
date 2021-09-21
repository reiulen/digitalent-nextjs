import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

// import Layout from "../../../components/templates/layout.component";
// import Tambah from "../../../components/content/publikasi/artikel/tambah";

import LoadingPage from "../../../components/LoadingPage";

const Tambah = dynamic(
    () => import("../../../components/content/publikasi/artikel/tambah"),
    { 
        // suspense: true,
        // loading: () => <LoadingSkeleton />, 
        loading: function loadingNow () {return <LoadingPage /> }, 
        ssr: false
    }
);

export default function TambahPage(props) {
    const session = props.session.user.user.data;
    return (
        <>
            <div className="d-flex flex-column flex-root">
                {/* <Layout title='Tambah Artikel - Publikasi'>
                    <Tambah />
                </Layout> */}
                <Tambah/>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
const session = await getSession({ req: context.req });
    if (!session) {
        return {
        redirect: {
            destination: "/",
            permanent: false,
        },
        };
    }

    return {
        props: { session, title: "Tambah Artikel - Publikasi" },
    };
}

// export default function TambahPage() {
//     return (
//         <>
//             <div className="d-flex flex-column flex-root">
//                 <Layout title='Tambah Artikel - Publikasi'>
//                     <Tambah />
//                 </Layout>
//             </div>
//         </>
//     )
// }