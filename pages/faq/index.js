import { getSession } from "next-auth/client"
import dynamic from "next/dynamic";
import { wrapper } from "../../redux/store";

import { getDataPribadi } from "../../redux/actions/pelatihan/function.actions"
import { getAllFaq } from "../../redux/actions/beranda/faq-content.actions"

const FaqPage = dynamic(
    () => import("../../user-component-new/content/home/faq/faq")
)

const Layout = dynamic(
    () => import("../../user-component-new/components/template/Layout.component"),
    { ssr: false }
)

export default function FaqDetail(props) {
    let session = null;
    if (props.session) {
        session = props.session.user.user.data.user
    }
    
    return (
        <div>
            <Layout title="FAQ" session={session}>
                <FaqPage session={session} />
            </Layout>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ req }) => {
            const session = await getSession({ req })

            await store.dispatch(getDataPribadi(session?.user.user.data.user.token));
            await store.dispatch(getAllFaq());
            return {
                props: {
                    session,
                    data: "auth",
                    title: "FAQ"
                }
            }
        }
)
