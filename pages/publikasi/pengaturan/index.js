import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import Layout from "../../../components/templates/layout.component";
// import PengaturanPublikasi from "../../../components/content/publikasi/pengaturan/pengaturan";

import { getSettingPublikasi } from '../../../redux/actions/publikasi/setting.actions'
import { wrapper } from '../../../redux/store'

import LoadingPage from "../../../components/LoadingPage";

const PengaturanPublikasi = dynamic(
    () => import("../../../components/content/publikasi/pengaturan/pengaturan"),
    { loading: () => <LoadingPage />, ssr: false }
);

export default function PengaturanPublikasiPage(props) {
    const session = props.session.user.user.data;
    return (
        <>
            <div className="d-flex flex-column flex-root">
                {/* <Layout title='Pengaturan - Publikasi'> */}
                    <PengaturanPublikasi token={session.token}/>
                {/* </Layout> */}
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query, req }) => {
    const session = await getSession({ req });
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    await store.dispatch(getSettingPublikasi(session.user.user.data.token))
    
    return {
        props: { session, title: "Pengaturan - Publikasi" },
    };
})