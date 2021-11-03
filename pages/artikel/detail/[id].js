import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { wrapper } from "../../../redux/store";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions"

const DetailArtikel = dynamic (() => 
    import (
        "../../../user-component/content/beranda/detail-artikel"
    )
)

const Layout = dynamic (() =>
    import (
        "../../../user-component/content/wrapper/layout.wrapper"
    )
)

export default function BerandaDetailArtikel(props) {
    let session = null;

    if (props.session) {
        session = props.session.user.user.data.user;
    }

    return (
        <>
            <Layout title="Detail Artikel" session={session}>
              <DetailArtikel session={session} />  
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
                  title: "Detail Artikel",
                  data: "auth",
                  session,
                },
            };
        }
)