import { getSession } from "next-auth/client"
import dynamic from "next/dynamic";
import { wrapper } from "../../redux/store";

import { getAllFaq } from "../../redux/actions/publikasi/faq.actions"

const FaqPage = dynamic(
    ()=>import("../../user-component/content/beranda/faq")
)

const Layout = dynamic(
    ()=>import("../../user-component/content/wrapper/layout.wrapper")
)

export default function FaqDetail(props){
    const session = props.session.user.user.data
    return(
        <div>
            <Layout title="FAQ" token={session.Token}>
                <FaqPage token={session.Token} />
            </Layout>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store)=>
    async({req})=>{
        const session = await getSession({req})

        await store.dispatch(getAllFaq(session?.user.user.data.user.token));
        return {
            props: {
                session,
                data: "auth",
                title: "FAQ"
            }
        }
    }
)
