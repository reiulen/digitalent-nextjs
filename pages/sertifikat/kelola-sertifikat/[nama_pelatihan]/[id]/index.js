import dynamic from "next/dynamic";
import Layout from "../../../../../components/templates/layout.component";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";

const KelolaSertifikatID = dynamic(
    () =>
        import(
            "../../../../../components/content/sertifikat/kelola-sertifikat/nama_pelatihan/id/kelola-sertifikat-ID"
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
                <KelolaSertifikatID />
            </div>
        </>
    );
}
