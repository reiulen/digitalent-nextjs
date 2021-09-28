import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";

const ListPeserta = dynamic(
    () =>
        import(
            "../../../../components/content/sertifikat/kelola-sertifikat/nama_pelatihan/id/list-peserta"
        ),
    {
        loading: function loadingNow() {
            return <LoadingSkeleton />;
        },
        ssr: false,
    }
);

export default function KelokaSertifikatPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                {/* <KelolaSertifikatKategori /> */}
                <ListPeserta />
            </div>
        </>
    );
}
