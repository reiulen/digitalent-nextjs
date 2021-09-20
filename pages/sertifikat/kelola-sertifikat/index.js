import dynamic from 'next/dynamic';
import LoadingSkeleton from '../../../components/LoadingSkeleton';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Pagination from 'react-js-pagination';

const KelolaSertifikat = dynamic(
    () =>
        import(
            '../../../components/content/sertifikat/kelola-sertifikat/kelola-sertifikat'
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
                <KelolaSertifikat />
            </div>
        </>
    );
}

// Function GETSERVERSIDE PROPS
// export const getServerSideProps = wrapper.getServerSideProps(
//     store =>
//         async ({ query }) => {
//             await store.dispatch(
//                 getAllArtikel(
//                     // 2,
//                     // '',
//                     // 5,
//                     // 1,
//                     // null,
//                     // null
//                     query.page,
//                     query.keyword,
//                     query.limit,
//                     query.publish,
//                     query.startdate,
//                     query.enddate
//                 )
//             );
//         }
// );
