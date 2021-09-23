import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";

const MasterSertifikat = dynamic(
    () =>
        import(
            "../../../components/content/sertifikat/master-sertifikat/master-sertifikat"
        ),
    {
        loading: function loadingNow() {
            return <LoadingSkeleton />;
        },
        ssr: false,
    }
);

export default function MasterSertifikatPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <MasterSertifikat />
            </div>
        </>
    );
}
