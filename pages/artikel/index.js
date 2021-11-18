import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { wrapper } from "../../redux/store";
import { getDataPribadi } from "../../redux/actions/pelatihan/function.actions"
import { getAllBerandaArtikel, getKategoriBerandaArtikel,  getTagBerandaArtikel} from "../../redux/actions/beranda/artikel.actions"
import { getAllAkademi } from "../../redux/actions/beranda/beranda.actions";

const Artikel  =  dynamic (() => 
    import (
        "../../user-component-new/content/home/artikel/artikel"
    )
)

const Layout = dynamic (() => 
    import (
        "../../user-component-new/components/template/Layout.component"
    )
)

export default function BerandaArtikel(props) {
    let session = null;

    if (props.session) {
        session = props.session.user.user.data.user;
    }

    return (
        <>
            <Layout title="Artikel" session={session}>
                <Artikel session={session} ></Artikel>
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
                getAllBerandaArtikel(
                    query.page,
                    query.keyword,
                    query.limit,
                    query.filterPublish,
                    query.sort,
                    query.category_id,
                    query.category_name,
                    query.category_akademi,
                    query.tag
                )
            ) 

            await store.dispatch (
                getKategoriBerandaArtikel()
            )

            await store.dispatch(
                getAllAkademi()
            );

            await store.dispatch(
                getTagBerandaArtikel()
            )

            return {
                props: {
                  title: "Artikel",
                  data: "auth",
                  session,
                },
            };
        }
)
