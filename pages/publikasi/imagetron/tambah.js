import dynamic from "next/dynamic";

import Layout from "../../../components/templates/layout.component";
// import Tambah from "../../../components/content/publikasi/imagetron/tambah";

import LoadingPage from "../../../components/LoadingPage";

const Tambah = dynamic(
    () => import("../../../components/content/publikasi/imagetron/tambah"),
    { 
        // suspense: true,
        // loading: () => <LoadingSkeleton />, 
        loading: function loadingNow () {return <LoadingPage /> }, 
        ssr: false
    }
);

export default function TambahPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Tambah Imagetron'>
                    <Tambah />
                </Layout>
            </div>
        </>
    )
}