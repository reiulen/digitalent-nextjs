import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";

const Tambah = dynamic(
    () =>
        import(
            "../../../../components/content/sertifikat/master-sertifikat/tambah/tambah"
        ),
    {
        loading: function loadingNow() {
            return <LoadingSkeleton />;
        },
        ssr: false,
    }
);

export default function TambahMasterSertifikatPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root font-weight-boldest">
                <Tambah />
            </div>
        </>
    );
}
