import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { wrapper } from "../../../redux/store";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions"
import { getDetailBerandaArtikel, getKategoriBerandaArtikel,  getTagBerandaArtikel} from "../../../redux/actions/beranda/artikel.actions"

const DetailArtikel = dynamic (() => 
    import (
        "../../../user-component-new/content/home/detail-artikel/detail-artikel"
    )
)

const Layout = dynamic (() =>
    import (
        "../../../user-component-new/components/template/Layout.component"
    )
)

export default function BerandaDetailArtikel(props) {
    let session = null;

    if (props.session) {
        session = props.session.user.user.data.user;
    }

    return (
        <div className="bg-white">
            <Layout title="Detail Artikel" session={session}>
              <DetailArtikel session={session} />  
            </Layout>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    ( store ) => 
        async ({params, req}) => {
            const session = await getSession({ req });

            let sessionToken = session?.user.user.data.user.token;

            await store.dispatch(getDataPribadi(sessionToken));

            await store.dispatch(
                getDetailBerandaArtikel(params.id)
            )

            await store.dispatch (
                getKategoriBerandaArtikel()
            )

            await store.dispatch(
                getTagBerandaArtikel()
            )

            return {
                props: {
                  title: "Detail Artikel",
                  data: "auth",
                  session,
                },
            };
        }
)