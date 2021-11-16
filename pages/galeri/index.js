import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { wrapper } from "../../redux/store";
import { getDataPribadi } from "../../redux/actions/pelatihan/function.actions"
import { getAllBerandaGaleri, getKategoriBerandaGaleri } from "../../redux/actions/beranda/galeri.actions"
// import { getKategoriBerandaGaleri  } from "../../redux/actions/beranda/galeri.actions"

const Galeri  =  dynamic (() => 
    import (
        "../../user-component/content/beranda/galeri"
    )
)

const Layout = dynamic (() => 
    import (
        "../../user-component/content/wrapper/layout.wrapper"
    )
)

export default function BerandaGaleri(props) {
    let session = null;

    if (props.session) {
        session = props.session.user.user.data.user;
    }

    return (
        <>
            <Layout title="Galeri" session={session}>
                <Galeri session={session} ></Galeri>
            </Layout>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    ( store ) => 
        async ({query, req}) => {
            const session = await getSession({ req });

            let sessionToken = session?.user.user.data.user.token;

            await store.dispatch(getDataPribadi(sessionToken));

            await store.dispatch(
                getAllBerandaGaleri(
                    query.page,
                    query.category_name,
                )
            )

            await store.dispatch (
                getKategoriBerandaGaleri()
            )

            return {
                props: {
                  title: "Galeri",
                  data: "auth",
                  session,
                },
            };
        }
)