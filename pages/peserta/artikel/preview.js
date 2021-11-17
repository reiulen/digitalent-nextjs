import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import { getDashboardPeserta } from "../../../redux/actions/pelatihan/dashboard-peserta.actions";
import LoadingContent from "../../../user-component/content/peserta/components/loader/LoadingContent";
import { useRouter } from "next/router";
import { getAllAkademi } from "../../../redux/actions/beranda/beranda.actions";
import { wrapper } from "../../../redux/store";

const Preview = dynamic(
    () => import("../../../user-component/content/peserta/artikel/preview"),
    {
        loading: function loadingNow() {
            return <LoadingContent />
        },
        ssr: false,
    }
);

const Layout = dynamic(
    () => import("../../../user-component/components/template/Layout.component")
);

export default function TambahArtikel(props) {
    const session = props.session.user.user.data.user;
    return (
        <>
            <Layout title="Preview Artikel" session={session}>
                <Preview session={session} success={props.success} />
            </Layout>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ req }) => {

            const session = await getSession({ req });
            if (!session) {
                return {
                    redirect: {
                        destination: "http://dts-dev.majapahit.id/login/admin",
                        permanent: false,
                    },
                };
            }

            return {
                props: {
                    data: "auth",
                    session,
                    title: "Preview Artikel"
                }
            }
        }
)