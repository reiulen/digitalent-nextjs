import dynamic from "next/dynamic";

// import Tambah from "../../../components/content/publikasi/kategori/tambah";

import LoadingPage from "../../../components/LoadingPage";
import { wrapper } from "../../../redux/store";

const Tambah = dynamic(
    () => import("../../../components/content/publikasi/kategori/tambah"),
    {
        // suspense: true,
        // loading: () => <LoadingSkeleton />,
        loading: function loadingNow() {
            return <LoadingPage />;
        },
        ssr: false,
    }
);

export default function TambahPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Tambah />
            </div>
        </>
    );
}
