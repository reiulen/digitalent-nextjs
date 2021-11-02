import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { wrapper } from "../../redux/store";
import { getDataPribadi } from "../../redux/actions/pelatihan/function.actions"

const Berita  =  dynamic (() => 
    import (
        "../../user-component/content/beranda/berita"
    )
)

const Layout = dynamic (() => 
    import (
        "../../user-component/content/wrapper/layout.wrapper"
    )
)

export default function BerandaBerita(props) {
    let session = null;

    if (props.session) {
        session = props.session.user.user.data.user;
    }

    return (
        <>
            <Layout title="Berita" session={session}>
                <Berita session={session} ></Berita>
            </Layout>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    ( store ) => 
        async ({params, req}) => {
            const session = await getSession({ req });

            let sessionToken = session?.user.user.data.user.token;

            await store.dispatch(getDataPribadi(sessionToken));

            return {
                props: {
                  title: "Berita",
                  data: "auth",
                  session,
                },
            };
        }
)
